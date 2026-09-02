'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, InputBase, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { fonts } from '../../contexts/ThemeContext';
import { API_NAME, API_VERSION, apiRoutes, resolveRequest } from '../../data/api';
import { profile, withPrefix } from '../../data/profile';
import { useConsole } from './ConsoleContext';
import JsonView from './JsonView';

const ASK_URL = process.env.NEXT_PUBLIC_ASK_AI_URL;

interface Entry {
  id: number;
  method: string;
  target: string;
  status: number;
  statusText: string;
  ms: number;
  bytes: number;
  body: unknown;
  file?: string;
  pending?: boolean;
}

interface Suggestion {
  command: string;
  summary: string;
}

// Built once from the route registry: every concrete path, plus the worked
// examples that show what the filters are for.
const SUGGESTIONS: Suggestion[] = (() => {
  const seen = new Set<string>();
  const list: Suggestion[] = [];
  const add = (command: string, summary: string) => {
    if (seen.has(command)) return;
    seen.add(command);
    list.push({ command, summary });
  };
  for (const route of apiRoutes) {
    if (!route.path.includes(':')) add(`${route.method} ${route.path}`, route.summary);
    route.examples?.forEach((example) => add(example, route.summary));
  }
  return list;
})();

const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;

const sizeOf = (body: unknown) => {
  const json = JSON.stringify(body) ?? '';
  return encoder ? encoder.encode(json).length : json.length;
};

const formatBytes = (bytes: number) =>
  bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} kB`;

const formatMs = (ms: number) => (ms < 10 ? `${ms.toFixed(2)} ms` : `${Math.round(ms)} ms`);

const bootEntry = (): Entry => {
  const started = performance.now();
  const resolved = resolveRequest('GET /')!;
  const elapsed = performance.now() - started;
  return {
    id: 0,
    method: 'GET',
    target: '/',
    status: resolved.response.status,
    statusText: resolved.response.statusText,
    ms: elapsed,
    bytes: sizeOf(resolved.response.body),
    body: resolved.response.body,
    file: resolved.route?.file,
  };
};

const ApiConsole = () => {
  const { isOpen, close, toggle, registerRunner } = useConsole();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const reduceMotion = useReducedMotion();

  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<Entry[]>(() => [bootEntry()]);
  const [history, setHistory] = useState<string[]>([]);
  const [active, setActive] = useState(-1);
  const [copied, setCopied] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const historyIndex = useRef(-1);

  const suggestions = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return [];
    return SUGGESTIONS.filter(
      (entry) =>
        entry.command.toLowerCase().includes(query) ||
        entry.summary.toLowerCase().includes(query),
    ).slice(0, 6);
  }, [input]);

  const suggestionsOpen = suggestions.length > 0;

  const push = useCallback((entry: Entry) => setEntries((previous) => [...previous, entry]), []);

  const run = useCallback(async (command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    setHistory((previous) => [...previous.filter((item) => item !== trimmed), trimmed]);
    historyIndex.current = -1;
    setInput('');
    setActive(-1);

    // Two console-level conveniences that never pretend to be HTTP.
    if (/^(clear|cls)$/i.test(trimmed)) {
      setEntries([bootEntry()]);
      return;
    }
    const normalised = /^(help|\?)$/i.test(trimmed) ? 'GET /' : trimmed;

    const started = performance.now();
    const resolved = resolveRequest(normalised);
    const elapsed = performance.now() - started;
    if (!resolved) return;

    const { request, route, response } = resolved;
    const queryString = new URLSearchParams(request.query).toString();
    const target = queryString ? `${request.path}?${queryString}` : request.path;
    const id = (nextId.current += 1);

    const base: Entry = {
      id,
      method: request.method,
      target,
      status: response.status,
      statusText: response.statusText,
      ms: elapsed,
      bytes: sizeOf(response.body),
      body: response.body,
      file: route?.file,
    };

    if (route?.kind === 'download' && response.status === 200) {
      const link = document.createElement('a');
      link.href = withPrefix(profile.resumePath);
      link.download = 'Vinay_Panwar_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      push(base);
      return;
    }

    if (route?.kind === 'ask') {
      const question = request.query.q?.trim();

      if (!question) {
        push({
          ...base,
          status: 400,
          statusText: 'Bad Request',
          body: {
            error: {
              status: 400,
              code: 'missing_question',
              message: "POST /ask needs a question — try: POST /ask what is his AI experience",
            },
          },
        });
        return;
      }

      if (!ASK_URL) {
        push({
          ...base,
          status: 503,
          statusText: 'Service Unavailable',
          body: {
            error: {
              status: 503,
              code: 'assistant_offline',
              message: 'The assistant is not wired up on this deployment.',
              fallback: `Email ${profile.email} — I answer within a day.`,
            },
          },
        });
        return;
      }

      // The upstream latency is the honest number here, so the timer restarts
      // rather than reporting how long the local parse took.
      const askStarted = performance.now();
      push({ ...base, pending: true, status: 0, statusText: '', bytes: 0, body: { question } });

      try {
        const result = await fetch(ASK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
        });
        const payload = (await result.json()) as { reply?: string; error?: string };
        if (!result.ok || !payload.reply) throw new Error(payload.error || 'Request failed');

        const body = { question, answer: payload.reply, model: 'claude-haiku-4-5' };
        setEntries((previous) =>
          previous.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  pending: false,
                  status: 200,
                  statusText: 'OK',
                  ms: performance.now() - askStarted,
                  bytes: sizeOf(body),
                  body,
                }
              : entry,
          ),
        );
      } catch {
        const body = {
          error: {
            status: 502,
            code: 'assistant_unreachable',
            message: "I couldn't reach the assistant just now.",
            fallback: `Email ${profile.email} — I answer within a day.`,
          },
        };
        setEntries((previous) =>
          previous.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  pending: false,
                  status: 502,
                  statusText: 'Bad Gateway',
                  ms: performance.now() - askStarted,
                  bytes: sizeOf(body),
                  body,
                }
              : entry,
          ),
        );
      }
      return;
    }

    push(base);
  }, [push]);

  /* ---- global hotkey ------------------------------------------------ */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  /* ---- let the trigger and app bar dispatch commands ---------------- */
  useEffect(() => {
    registerRunner((command) => void run(command));
    return () => registerRunner(null);
  }, [registerRunner, run]);

  /* ---- focus, scroll lock, autoscroll ------------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [entries, reduceMotion]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (suggestionsOpen && active >= 0) {
        setActive(-1);
      } else {
        close();
      }
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      void run(active >= 0 && suggestions[active] ? suggestions[active].command : input);
      return;
    }

    if (event.key === 'Tab' && suggestionsOpen) {
      event.preventDefault();
      setInput(suggestions[Math.max(active, 0)].command);
      setActive(-1);
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;

      if (suggestionsOpen) {
        setActive((previous) => {
          const next = previous + step;
          if (next < -1) return suggestions.length - 1;
          if (next >= suggestions.length) return -1;
          return next;
        });
        return;
      }

      // Empty input walks the command history, newest first.
      if (history.length === 0) return;
      const next = Math.min(Math.max(historyIndex.current - step, -1), history.length - 1);
      historyIndex.current = next;
      setInput(next === -1 ? '' : history[history.length - 1 - next]);
    }
  };

  const copyCurl = async (entry: Entry) => {
    if (!entry.file) return;
    const command = `curl -s ${window.location.origin}${withPrefix(entry.file)}`;
    try {
      await navigator.clipboard.writeText(command);
      setCopied(entry.id);
      window.setTimeout(() => setCopied((current) => (current === entry.id ? null : current)), 1600);
    } catch {
      // Clipboard is blocked in some embedded contexts; the command is still
      // visible on screen, so failing quietly beats an error dialog.
    }
  };

  const statusColor = (status: number) => {
    if (status >= 500) return theme.palette.error.main;
    if (status >= 400) return dark ? '#E9C46A' : '#B45309';
    return theme.palette.success.main;
  };

  const surface = dark ? 'rgba(20,24,32,0.97)' : 'rgba(255,255,255,0.98)';
  const inset = dark ? 'rgba(148,163,184,0.05)' : 'rgba(15,23,42,0.025)';

  return (
    <AnimatePresence>
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1400,
            display: 'flex',
            alignItems: { xs: 'flex-end', sm: 'flex-start' },
            justifyContent: 'center',
            pt: { sm: '9vh' },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: 'absolute',
              inset: 0,
              background: dark ? 'rgba(6,8,12,0.72)' : 'rgba(15,23,42,0.4)',
              backdropFilter: 'blur(3px)',
            }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Career API console"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 }}
            transition={{ duration: 0.24, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: 'relative',
              width: 'min(920px, calc(100vw - 24px))',
              maxHeight: 'min(660px, 86vh)',
              display: 'flex',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                borderRadius: { xs: '16px 16px 0 0', sm: 3 },
                border: '1px solid',
                borderColor: dark ? 'rgba(148,163,184,0.2)' : 'rgba(15,23,42,0.12)',
                bgcolor: surface,
                backdropFilter: 'blur(20px)',
                overflow: 'hidden',
                boxShadow: dark
                  ? '0 32px 90px rgba(0,0,0,0.6)'
                  : '0 32px 90px rgba(15,23,42,0.22)',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  px: 2,
                  py: 1.25,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  bgcolor: inset,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'text.primary',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {API_NAME}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: '0.72rem',
                      color: 'text.secondary',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    v{API_VERSION} · static export · read-only
                  </Typography>
                </Box>
                <IconButton size="small" onClick={close} aria-label="Close console">
                  <CloseIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </IconButton>
              </Box>

              {/* Output */}
              <Box
                ref={outputRef}
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  px: { xs: 1.75, sm: 2.5 },
                  py: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                  minHeight: 180,
                }}
              >
                {entries.map((entry) => (
                  <Box key={entry.id}>
                    {/* Request line */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 1,
                        flexWrap: 'wrap',
                        fontFamily: fonts.mono,
                        fontSize: '0.8rem',
                      }}
                    >
                      <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
                        {entry.method}
                      </Box>
                      <Box component="span" sx={{ color: 'text.primary' }}>
                        {entry.target}
                      </Box>
                    </Box>

                    {/* Status line */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        flexWrap: 'wrap',
                        mt: 0.75,
                        mb: 1,
                        fontFamily: fonts.mono,
                        fontSize: '0.72rem',
                        color: 'text.secondary',
                      }}
                    >
                      {entry.pending ? (
                        <Box component="span" sx={{ color: 'text.secondary' }}>
                          ··· waiting for upstream
                        </Box>
                      ) : (
                        <>
                          <Box
                            component="span"
                            sx={{ color: statusColor(entry.status), fontWeight: 700 }}
                          >
                            {entry.status} {entry.statusText}
                          </Box>
                          <span>·</span>
                          <span>{formatMs(entry.ms)}</span>
                          <span>·</span>
                          <span>{formatBytes(entry.bytes)}</span>
                          {entry.file && entry.status === 200 && (
                            <>
                              <span>·</span>
                              <Box
                                component="button"
                                onClick={() => copyCurl(entry)}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 0.5,
                                  px: 0.75,
                                  py: 0.25,
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  bgcolor: 'transparent',
                                  color: 'text.secondary',
                                  fontFamily: fonts.mono,
                                  fontSize: '0.68rem',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                                }}
                              >
                                {copied === entry.id ? (
                                  <CheckIcon sx={{ fontSize: 12 }} />
                                ) : (
                                  <ContentCopyIcon sx={{ fontSize: 12 }} />
                                )}
                                {copied === entry.id ? 'copied' : 'copy curl'}
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </Box>

                    {/* Body */}
                    <Box
                      sx={{
                        p: { xs: 1.25, sm: 1.75 },
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: inset,
                        opacity: entry.pending ? 0.6 : 1,
                      }}
                    >
                      <JsonView value={entry.body} />
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Suggestions */}
              {suggestionsOpen && (
                <Box
                  role="listbox"
                  aria-label="Route suggestions"
                  sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    maxHeight: 210,
                    overflowY: 'auto',
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <Box
                      key={suggestion.command}
                      role="option"
                      aria-selected={index === active}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => void run(suggestion.command)}
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        gap: 2,
                        px: { xs: 1.75, sm: 2.5 },
                        py: 1,
                        cursor: 'pointer',
                        bgcolor: index === active ? inset : 'transparent',
                        borderLeft: '2px solid',
                        borderColor: index === active ? 'primary.main' : 'transparent',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: fonts.mono,
                          fontSize: '0.79rem',
                          color: index === active ? 'primary.main' : 'text.primary',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {suggestion.command}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.74rem',
                          color: 'text.secondary',
                          textAlign: 'right',
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        {suggestion.summary}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Input */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: { xs: 1.75, sm: 2.5 },
                  pt: 1.5,
                  pb: { xs: 'max(12px, env(safe-area-inset-bottom))', sm: 1.5 },
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: inset,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'primary.main',
                  }}
                >
                  ❯
                </Box>
                <InputBase
                  inputRef={inputRef}
                  fullWidth
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                    setActive(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="GET /experience?tag=azure"
                  spellCheck={false}
                  autoComplete="off"
                  inputProps={{
                    'aria-label': 'API request',
                    autoCapitalize: 'off',
                    autoCorrect: 'off',
                    maxLength: 300,
                  }}
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: '0.88rem',
                    color: 'text.primary',
                    '& input::placeholder': { color: 'text.secondary', opacity: 0.7 },
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: '0.68rem',
                    color: 'text.secondary',
                    whiteSpace: 'nowrap',
                    display: { xs: 'none', sm: 'block' },
                  }}
                >
                  ↑↓ history · tab complete · esc close
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
};

/** The affordance that makes the console discoverable — a fake prompt that
 *  cycles through real requests and opens the console primed with one. */
export const ConsoleTrigger = () => {
  const { open } = useConsole();
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  const rotation = useMemo(
    () => [
      'GET /experience?tag=azure',
      'GET /projects/multi-agent-ai-assistant',
      'GET /stack?group=ai',
      ...(ASK_URL ? ['POST /ask why should we hire him'] : []),
      'GET /impact',
    ],
    [],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setIndex((previous) => (previous + 1) % rotation.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion, rotation.length]);

  const command = rotation[index];

  return (
    <Box
      component="button"
      onClick={() => open(command)}
      aria-label={`Open the career API console and run ${command}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        width: '100%',
        maxWidth: 520,
        px: 1.75,
        py: 1.25,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: dark ? 'rgba(148,163,184,0.05)' : 'rgba(15,23,42,0.025)',
        cursor: 'pointer',
        textAlign: 'left',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: dark ? 'rgba(139,150,250,0.07)' : 'rgba(79,70,229,0.04)',
        },
      }}
    >
      <Box
        component="span"
        sx={{ fontFamily: fonts.mono, fontSize: '0.82rem', color: 'primary.main', fontWeight: 700 }}
      >
        ❯
      </Box>
      <Box sx={{ flex: 1, minWidth: 0, position: 'relative', height: 20 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={command}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: 0.28 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}
          >
            <Typography
              sx={{
                fontFamily: fonts.mono,
                fontSize: '0.82rem',
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {command}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: '7px',
                  height: '1em',
                  ml: '3px',
                  verticalAlign: 'text-bottom',
                  bgcolor: 'primary.main',
                  '@keyframes consoleCaret': { '0%, 45%': { opacity: 1 }, '55%, 100%': { opacity: 0 } },
                  animation: reduceMotion ? 'none' : 'consoleCaret 1.1s step-end infinite',
                }}
              />
            </Typography>
          </motion.div>
        </AnimatePresence>
      </Box>
      <Box
        component="span"
        sx={{
          fontFamily: fonts.mono,
          fontSize: '0.68rem',
          color: 'text.secondary',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          px: 0.75,
          py: 0.25,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        ⌘K
      </Box>
    </Box>
  );
};

/** Compact app-bar entry point. */
export const ConsoleButton = ({ full = false }: { full?: boolean }) => {
  const { open } = useConsole();

  return (
    <Tooltip title="Query my career as an API (⌘K)">
      <Box
        component="button"
        onClick={() => open()}
        aria-label="Open the career API console"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: full ? 'flex-start' : 'center',
          gap: 1,
          width: full ? '100%' : 'auto',
          px: 1.25,
          py: 0.75,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'transparent',
          color: 'text.secondary',
          fontFamily: fonts.mono,
          fontSize: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
        }}
      >
        <Box component="span">/api</Box>
        <Box component="span" sx={{ opacity: 0.65 }}>⌘K</Box>
      </Box>
    </Tooltip>
  );
};

export default ApiConsole;
