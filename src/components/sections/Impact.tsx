'use client';
import { Box, Container, Typography, Card } from '@mui/material';
import { fonts } from '../../contexts/ThemeContext';
import { capabilities, stack, profile } from '../../data/profile';
import SectionHeading from '../common/SectionHeading';
import MonoChip from '../common/MonoChip';
import Reveal from '../common/Reveal';

const Impact = () => (
  <Box id="impact" sx={{ py: { xs: 10, md: 14 } }}>
    <Container maxWidth="lg">
      <SectionHeading
        eyebrow="01 · Capabilities"
        title="What you get when you hire me"
        subtitle="Backend depth, applied AI engineering, and the DevOps to ship both — with numbers from production, not promises."
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 3,
        }}
      >
        {capabilities.map((cap, index) => (
          <Reveal key={cap.title} delay={index * 0.1} style={{ height: '100%' }}>
            <Card
              sx={{
                p: 3.5,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.25s ease, transform 0.25s ease',
                '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' },
              }}
            >
              <Typography
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.78rem',
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h5" sx={{ fontSize: '1.2rem', color: 'text.primary', mb: 1.5 }}>
                {cap.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, flexGrow: 1 }}>
                {cap.description}
              </Typography>
              <Typography
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 1.5,
                }}
              >
                {cap.metric}
              </Typography>
            </Card>
          </Reveal>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '8fr 4fr' },
          gap: 3,
        }}
      >
        <Reveal delay={0.1}>
          <Card sx={{ p: 3.5, height: '100%' }}>
            <Typography
              sx={{
                fontFamily: fonts.mono,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 3,
              }}
            >
              The stack I ship with
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {stack.map((row) => (
                <Box
                  key={row.group}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '110px 1fr' },
                    gap: { xs: 0.75, sm: 2 },
                    alignItems: 'baseline',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: '0.75rem',
                      color: 'primary.main',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.group}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {row.items.map((item) => (
                      <MonoChip key={item} label={item} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <Card
            sx={{
              p: 3.5,
              height: '100%',
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(139,150,250,0.4)' : 'rgba(79,70,229,0.35)',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(160deg, rgba(139,150,250,0.09) 0%, rgba(16,19,27,0) 60%)'
                  : 'linear-gradient(160deg, rgba(79,70,229,0.05) 0%, rgba(255,255,255,0) 60%)',
            }}
          >
            <Typography
              sx={{
                fontFamily: fonts.mono,
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 3,
              }}
            >
              Currently
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {[
                { label: 'Leading', value: `2–4 engineers at ${profile.company}` },
                { label: 'Building', value: 'Agentic workflows with N8N + Ollama' },
                { label: 'Status', value: profile.availability, live: true },
              ].map((row) => (
                <Box key={row.label}>
                  <Typography
                    sx={{ fontFamily: fonts.mono, fontSize: '0.72rem', color: 'primary.main', mb: 0.5 }}
                  >
                    {row.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {row.live && (
                      <Box
                        sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main', flexShrink: 0 }}
                      />
                    )}
                    <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: 'text.primary' }}>
                      {row.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>
        </Reveal>
      </Box>
    </Container>
  </Box>
);

export default Impact;
