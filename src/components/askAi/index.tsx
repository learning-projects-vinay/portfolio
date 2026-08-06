'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Card, IconButton, InputBase, Typography, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
import { fonts } from '../../contexts/ThemeContext';
import { profile } from '../../data/profile';

const API_URL = process.env.NEXT_PUBLIC_ASK_AI_URL;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

const SUGGESTIONS = [
  "What's his AI experience?",
  'Has he led teams?',
  'Why should we hire him?',
  "What's his stack?",
];

const WELCOME =
  "Hi! I'm Vinay's AI — grounded in his résumé and projects. Ask me anything a recruiter or client would want to know.";

const TypingDots = () => (
  <Box sx={{ display: 'flex', gap: 0.6, px: 2, py: 1.5 }}>
    {[0, 1, 2].map((i) => (
      <Box
        key={i}
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: 'text.secondary',
          '@keyframes askAiDot': {
            '0%, 60%, 100%': { opacity: 0.25 },
            '30%': { opacity: 1 },
          },
          animation: `askAiDot 1.2s ease-in-out ${i * 0.15}s infinite`,
        }}
      />
    ))}
  </Box>
);

const AskAi = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  if (!API_URL) return null;

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    const history = [...messages.filter((m) => !m.isError), { role: 'user' as const, content: question }];
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.slice(-11).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        throw new Error(data.error || 'Request failed');
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply! }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          isError: true,
          content: `I couldn't reach the assistant just now — you can always email Vinay directly at ${profile.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
          >
            <Box
              component="button"
              onClick={() => setOpen(true)}
              aria-label="Ask Vinay's AI assistant"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2.25,
                py: 1.5,
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 30px rgba(139,150,250,0.35)'
                    : '0 8px 30px rgba(79,70,229,0.3)',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 18 }} />
              <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.85rem', fontWeight: 600 }}>
                ask my AI
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1300,
              width: 'min(400px, calc(100vw - 32px))',
            }}
          >
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'min(540px, calc(100vh - 110px))',
                overflow: 'hidden',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 24px 60px rgba(0,0,0,0.55)'
                    : '0 24px 60px rgba(15,23,42,0.18)',
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                  <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.85rem', fontWeight: 600, color: 'text.primary' }}>
                    vinay.ai
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                    · grounded in his résumé
                  </Typography>
                </Box>
                <Tooltip title="Close">
                  <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Messages */}
              <Box ref={scrollRef} sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Bubble role="assistant" content={WELCOME} />
                {messages.map((message, index) => (
                  <Bubble key={index} role={message.role} content={message.content} isError={message.isError} />
                ))}
                {loading && <TypingDots />}

                {messages.length === 0 && !loading && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                    {SUGGESTIONS.map((suggestion) => (
                      <Box
                        key={suggestion}
                        component="button"
                        onClick={() => send(suggestion)}
                        sx={{
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 50,
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
                        {suggestion}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Input */}
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1.25,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <InputBase
                  fullWidth
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Vinay…"
                  inputProps={{ maxLength: 1000, 'aria-label': "Ask Vinay's AI assistant" }}
                  sx={{ fontSize: '0.92rem', color: 'text.primary' }}
                />
                <IconButton
                  type="submit"
                  size="small"
                  disabled={!input.trim() || loading}
                  sx={{ color: 'primary.main', '&.Mui-disabled': { color: 'text.secondary', opacity: 0.4 } }}
                  aria-label="Send"
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </Box>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Bubble = ({ role, content, isError }: { role: 'user' | 'assistant'; content: string; isError?: boolean }) => (
  <Box
    sx={{
      alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
      maxWidth: '85%',
      px: 1.75,
      py: 1.1,
      borderRadius: role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
      bgcolor: (theme) =>
        role === 'user'
          ? 'primary.main'
          : theme.palette.mode === 'dark'
            ? 'rgba(148,163,184,0.08)'
            : 'rgba(15,23,42,0.04)',
      color: role === 'user' ? 'primary.contrastText' : isError ? 'text.secondary' : 'text.primary',
      border: isError ? '1px dashed' : 'none',
      borderColor: 'divider',
    }}
  >
    <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{content}</Typography>
  </Box>
);

export default AskAi;
