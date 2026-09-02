'use client';
import { useId, useRef, useState } from 'react';
import { Box, Collapse, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { fonts } from '../../contexts/ThemeContext';
import {
  profile,
  experience,
  formatPeriod,
  formatDuration,
  projectsForRole,
  roleVersion,
  type Entry,
  type EntryKind,
  type Project,
  type Role,
} from '../../data/profile';

const MARKS: Record<EntryKind, string> = {
  added: '+',
  changed: '~',
  perf: '↑',
  security: '!',
};

// Motion is scroll-triggered per release, so no single block runs longer than
// the stagger below — the page never assembles as one long ceremony.
const releaseVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const useLineVariants = () => {
  const reduceMotion = useReducedMotion();

  // Under reduced motion the reveal is removed entirely rather than sped up.
  // Shortening it would still leave every line at opacity 0 until it scrolled
  // into view — which is the thing being opted out of, not the duration.
  if (reduceMotion) {
    return { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };
  }

  return {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
  };
};

const useKindColor = () => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  return (kind: EntryKind | 'notable') => {
    if (kind === 'added') return theme.palette.success.main;
    if (kind === 'perf') return dark ? '#E9C46A' : '#B45309';
    if (kind === 'security') return theme.palette.error.main;
    return theme.palette.primary.main;
  };
};

/** The marker, kind label and text of one changelog line. */
const Line = ({
  mark,
  kind,
  color,
  children,
}: {
  mark: string;
  kind: string;
  color: string;
  children: React.ReactNode;
}) => {
  const lineVariants = useLineVariants();

  return (
    <motion.div variants={lineVariants}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '14px 62px minmax(0, 1fr)', sm: '16px 80px minmax(0, 1fr)' },
          gap: { xs: 1, sm: 1.25 },
          alignItems: 'baseline',
          py: 0.4,
        }}
      >
        <Box
          component="span"
          aria-hidden
          sx={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: '0.9rem', color, lineHeight: 1.6 }}
        >
          {mark}
        </Box>
        <Box
          component="span"
          sx={{
            fontFamily: fonts.mono,
            fontSize: { xs: '0.62rem', sm: '0.68rem' },
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text.secondary',
          }}
        >
          {kind}
        </Box>
        <Box sx={{ minWidth: 0 }}>{children}</Box>
      </Box>
    </motion.div>
  );
};

/** A project, filed under the release it shipped in and opening into its case study. */
const Notable = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);
  const color = useKindColor()('notable');
  const panelId = useId();

  return (
    <Line mark="★" kind="notable" color={color}>
      <Box
        component="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls={panelId}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          p: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'text.primary',
          font: 'inherit',
        }}
      >
        <Typography component="span" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
          {project.title}
        </Typography>
        {project.privateNote && (
          <Box
            component="span"
            sx={{
              fontFamily: fonts.mono,
              fontSize: '0.65rem',
              color: 'text.secondary',
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              px: 0.75,
              py: 0.15,
            }}
          >
            private build
          </Box>
        )}
        <Box
          component="span"
          aria-hidden
          sx={{
            fontFamily: fonts.mono,
            fontSize: '0.7rem',
            color: 'primary.main',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(90deg)' : 'none',
          }}
        >
          ▸
        </Box>
      </Box>

      <Collapse in={open} timeout={260} id={panelId}>
        <Box
          sx={{
            mt: 1,
            p: { xs: 1.75, sm: 2 },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          {([
            ['Problem', project.problem],
            ['Build', project.build],
            ['Outcome', project.outcome],
          ] as const).map(([heading, body]) => (
            <Box key={heading} sx={{ mb: 1.25, '&:last-of-type': { mb: 0 } }}>
              <Typography
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.65rem',
                  letterSpacing: '0.11em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mb: 0.25,
                }}
              >
                {heading}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {body}
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              mt: 1.5,
              pt: 1.25,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontFamily: fonts.mono, fontSize: '0.7rem', color: 'text.secondary' }}
            >
              {project.tech.join(' · ')}
            </Typography>
            {project.links.map((link) => (
              <Typography
                key={link.href}
                component="a"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.7rem',
                  color: 'primary.main',
                  ml: 'auto',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {link.label} ↗
              </Typography>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Line>
  );
};

const Marker = ({ variant }: { variant: 'current' | 'past' | 'hollow' }) => {
  const lineVariants = useLineVariants();

  return (
    <motion.div
      variants={lineVariants}
      style={{ position: 'absolute', left: -30, top: 6 }}
      aria-hidden
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'background.default',
          bgcolor:
            variant === 'current'
              ? 'primary.main'
              : variant === 'hollow'
                ? 'background.default'
                : 'text.secondary',
          ...(variant === 'hollow' && { borderColor: 'text.secondary' }),
        }}
      />
    </motion.div>
  );
};

const ReleaseHeader = ({
  version,
  title,
  meta,
  breaking,
}: {
  version: string;
  title?: string;
  meta: string;
  breaking?: boolean;
}) => {
  const lineVariants = useLineVariants();

  return (
    <motion.div variants={lineVariants}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: { xs: 1, sm: 1.25 },
          mb: 1.25,
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontFamily: fonts.mono,
            fontWeight: 700,
            fontSize: { xs: '1.05rem', sm: '1.2rem' },
            color: 'text.primary',
            letterSpacing: '-0.01em',
          }}
        >
          {version}
        </Typography>

        {breaking && (
          <Box
            component="span"
            sx={{
              fontFamily: fonts.mono,
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: (theme) => (theme.palette.mode === 'dark' ? '#E9C46A' : '#B45309'),
              border: '1px solid',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(233,196,106,0.45)' : 'rgba(180,83,9,0.45)',
              borderRadius: 1,
              px: 0.75,
              py: 0.15,
            }}
          >
            breaking
          </Box>
        )}

        {title && (
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: 'text.primary' }}>
            {title}
          </Typography>
        )}

        <Typography
          sx={{
            fontFamily: fonts.mono,
            fontSize: '0.72rem',
            color: 'text.secondary',
            ml: { sm: 'auto' },
          }}
        >
          {meta}
        </Typography>
      </Box>
    </motion.div>
  );
};

const Release = ({ role, initial }: { role: Role; initial: boolean }) => {
  const kindColor = useKindColor();
  const current = !role.end;
  const shipped = projectsForRole(role);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={releaseVariants}
      style={{ position: 'relative', paddingBottom: 34 }}
    >
      <Marker variant={current ? 'current' : 'past'} />
      <ReleaseHeader
        version={roleVersion(role)}
        title={`${role.title} · ${role.company}`}
        meta={`${formatPeriod(role.start, role.end)} · ${formatDuration(role.start, role.end)}`}
        breaking={!initial}
      />

      {role.achievements.map((entry: Entry) => (
        <Line
          key={entry.text}
          mark={MARKS[entry.kind]}
          kind={entry.kind}
          color={kindColor(entry.kind)}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {entry.text}
          </Typography>
        </Line>
      ))}

      {shipped.map((project) => (
        <Notable key={project.title} project={project} />
      ))}
    </motion.section>
  );
};

const Releases = () => {
  const reduceMotion = useReducedMotion();
  const kindColor = useKindColor();
  // Observed on the timeline itself, which has real dimensions. The spine can't
  // observe itself — see the note by the spine below.
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });

  return (
    <Box component="section" id="changelog" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: fonts.mono,
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            mb: 1.5,
          }}
        >
          Changelog
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.9rem', md: '2.5rem' }, color: 'text.primary', mb: 1.5 }}
        >
          Every role is a release.
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: 560, mb: { xs: 5, md: 7 } }}
        >
          Every line below is something that actually shipped — newest first.
        </Typography>

        <Box ref={timelineRef} sx={{ position: 'relative', pl: { xs: 3.75, sm: 3.75 } }}>
          {/* The spine: one continuous gesture down the page, drawn once. */}
          <Box
            aria-hidden
            sx={{ position: 'absolute', left: 6, top: 8, bottom: 12, width: '1px' }}
          >
            {/* Driven from the timeline's own visibility rather than the spine's.
                A scaleY(0) element has zero area, and a zero-area target never
                reports as intersecting — so a spine that observed itself would
                wait forever on an observer waiting on the animation. */}
            <motion.div
              initial={{ scaleY: reduceMotion ? 1 : 0 }}
              animate={{ scaleY: timelineInView || reduceMotion ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.4, 0, 0.2, 1] }}
              style={{ height: '100%', transformOrigin: 'top' }}
            >
              <Box
                sx={{
                  height: '100%',
                  background: (theme) =>
                    `linear-gradient(to bottom, ${theme.palette.divider} 0%, ${theme.palette.divider} 88%, transparent 100%)`,
                }}
              />
            </motion.div>
          </Box>

          {/* Unreleased — a real changelog section, and an honest one here. */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={releaseVariants}
            style={{ position: 'relative', paddingBottom: 34 }}
          >
            <Marker variant="hollow" />
            <ReleaseHeader version="Unreleased" meta="now building" />
            <Line mark="~" kind="wip" color={kindColor('changed')}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {profile.nowBuilding}
              </Typography>
            </Line>
          </motion.section>

          {experience.map((role, index) => (
            <Release
              key={role.title}
              role={role}
              initial={index === experience.length - 1}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Releases;
