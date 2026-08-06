'use client';
import { Box, Container, Typography, Card } from '@mui/material';
import Image from 'next/image';
import { fonts } from '../../contexts/ThemeContext';
import { profile, education, withPrefix, totalExperienceYears } from '../../data/profile';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';

const quickFacts = () => [
  { label: 'Location', value: `${profile.location} · ${profile.timezone}` },
  { label: 'Experience', value: totalExperienceYears() },
  { label: 'Languages', value: profile.languages },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
];

const About = () => (
  <Box
    id="about"
    sx={{
      py: { xs: 10, md: 14 },
      borderTop: '1px solid',
      borderColor: 'divider',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.025)' : 'rgba(15,23,42,0.015)'),
    }}
  >
    <Container maxWidth="lg">
      <SectionHeading eyebrow="04 · The person" title="A short, honest bio" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          gap: { xs: 4, md: 6 },
          alignItems: 'start',
        }}
      >
        <Reveal>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              aspectRatio: '1 / 1',
              maxWidth: 440,
            }}
          >
            <Image
              src={withPrefix('/images/63460.png')}
              alt="Vinay Panwar at the office"
              fill
              sizes="(max-width: 900px) 90vw, 440px"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Reveal>

        <Reveal delay={0.1}>
          <Box>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5, fontSize: { md: '1.05rem' } }}>
              I joined {profile.company} as a trainee in December 2022.{' '}
              <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                Three years and three promotions later
              </Box>
              , I lead a team of engineers there — a progression earned by shipping, not by tenure.
              My core is Node.js and TypeScript on Azure: REST APIs, event-driven services, and the
              CI/CD that gets them to production reliably.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2.5, fontSize: { md: '1.05rem' } }}>
              Over the last year my focus has shifted to{' '}
              <Box component="strong" sx={{ color: 'text.primary', fontWeight: 600 }}>
                AI engineering
              </Box>{' '}
              — designing agents, orchestrating LLMs, and wiring agentic workflows into real
              products rather than demos. I also work directly with international clients on
              scoping, sprint planning, and live demos, so I&apos;m as comfortable owning a
              conversation as owning a codebase.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2.5,
                mb: 4,
                mt: 4,
              }}
            >
              {quickFacts().map((fact) => (
                <Box key={fact.label} sx={{ borderTop: '2px solid', borderColor: 'divider', pt: 1.25 }}>
                  <Typography
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'primary.main',
                      mb: 0.5,
                    }}
                  >
                    {fact.label}
                  </Typography>
                  {fact.href ? (
                    <Typography
                      component="a"
                      href={fact.href}
                      sx={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'text.primary',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {fact.value}
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'text.primary' }}>
                      {fact.value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>

            <Card sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                Education
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {education.map((entry) => (
                  <Box
                    key={entry.degree}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: 'text.primary' }}>
                        {entry.degree}
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        {entry.institution}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: fonts.mono,
                        fontSize: '0.8rem',
                        color: 'text.secondary',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {entry.period} · {entry.grade}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          </Box>
        </Reveal>
      </Box>
    </Container>
  </Box>
);

export default About;
