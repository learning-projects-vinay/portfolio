'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DownloadIcon from '@mui/icons-material/Download';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { fonts } from '../../contexts/ThemeContext';
import { profile, heroStats, withPrefix } from '../../data/profile';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const AvailabilityBadge = () => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 1,
      px: 1.75,
      py: 0.75,
      borderRadius: 50,
      border: '1px solid',
      borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(52,211,153,0.35)' : 'rgba(5,150,105,0.3)',
      bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(52,211,153,0.08)' : 'rgba(5,150,105,0.06)',
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: 'success.main',
        '@keyframes availPulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(52,211,153,0.5)' },
          '70%': { boxShadow: '0 0 0 7px rgba(52,211,153,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(52,211,153,0)' },
        },
        animation: 'availPulse 2.4s ease-out infinite',
      }}
    />
    <Typography
      sx={{
        fontFamily: fonts.mono,
        fontSize: '0.78rem',
        fontWeight: 500,
        color: 'success.main',
        letterSpacing: '0.02em',
      }}
    >
      {profile.availability}
    </Typography>
  </Box>
);

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 14, md: 10 },
        pb: { xs: 8, md: 4 },
      }}
    >
      {/* Blueprint grid backdrop, fading out radially */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: (theme) => {
            const line =
              theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.07)' : 'rgba(15,23,42,0.05)';
            return `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`;
          },
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 60% 30%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 60% 30%, black 30%, transparent 75%)',
        }}
      />
      {/* Single soft accent glow */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          maxWidth: 760,
          maxHeight: 760,
          borderRadius: '50%',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(139,150,250,0.13) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' },
            gap: { xs: 6, md: 8 },
            alignItems: 'center',
          }}
        >
          {/* Left: pitch */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item}>
              <AvailabilityBadge />
            </motion.div>

            <motion.div variants={item}>
              <Typography
                component="p"
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.82rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mt: 3,
                  mb: 2,
                }}
              >
                {profile.role} — {profile.focus}
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.25rem', md: '3.8rem', lg: '4.3rem' },
                  color: 'text.primary',
                  mb: 3,
                }}
              >
                I build production backends
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {' '}
                  & the AI systems{' '}
                </Box>
                around them.
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1.02rem', md: '1.12rem' },
                  maxWidth: '540px',
                  mb: 4,
                }}
              >
                Three years shipping Node.js and TypeScript services on Azure —{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  200+ REST APIs
                </Box>
                , event-driven systems, and{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                  multi-agent LLM workflows
                </Box>
                . Currently leading a team of engineers at {profile.company}.
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: { xs: 5, md: 7 } }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  sx={{ px: 3.5, py: 1.5, fontSize: '1rem' }}
                >
                  Hire me
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component="a"
                  href={withPrefix(profile.resumePath)}
                  download="Vinay_Panwar_Resume.pdf"
                  startIcon={<DownloadIcon />}
                  sx={{ px: 3.5, py: 1.5, fontSize: '1rem', color: 'text.primary' }}
                >
                  Résumé
                </Button>
              </Box>
            </motion.div>

            <motion.div variants={item}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                  gap: { xs: 3, md: 2 },
                  maxWidth: '620px',
                }}
              >
                {heroStats.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{ borderTop: '2px solid', borderColor: 'divider', pt: 1.5 }}
                  >
                    <Typography
                      sx={{
                        fontFamily: fonts.mono,
                        fontSize: { xs: '1.4rem', md: '1.6rem' },
                        fontWeight: 700,
                        color: 'text.primary',
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.5, mt: 0.5 }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </motion.div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <Box sx={{ position: 'relative', maxWidth: 420, mx: 'auto' }}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 6,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'radial-gradient(ellipse 120% 90% at 50% 100%, rgba(139,150,250,0.24) 0%, rgba(24,28,37,0.6) 70%)'
                      : 'radial-gradient(ellipse 120% 90% at 50% 100%, rgba(79,70,229,0.14) 0%, rgba(255,255,255,0.7) 70%)',
                  aspectRatio: '1 / 1.08',
                }}
              >
                <Image
                  src={withPrefix('/images/hero-cutout.png')}
                  alt="Vinay Panwar — Senior Software Engineer"
                  fill
                  priority
                  sizes="(max-width: 900px) 90vw, 420px"
                  style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                />
              </Box>

              {/* Now-building card */}
              <Box
                sx={{
                  position: { xs: 'relative', md: 'absolute' },
                  bottom: { md: 24 },
                  left: { md: -36 },
                  mt: { xs: 2, md: 0 },
                  px: 2.25,
                  py: 1.75,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(24,28,37,0.92)' : 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 16px 40px rgba(0,0,0,0.45)'
                      : '0 16px 40px rgba(15,23,42,0.12)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'primary.main',
                    mb: 0.5,
                  }}
                >
                  Now building
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: 'text.primary' }}>
                  Agentic workflows — N8N + local LLMs
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
