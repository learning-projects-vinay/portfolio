'use client';
import { Box, Container, Typography } from '@mui/material';
import { fonts } from '../../contexts/ThemeContext';
import { experience, formatDuration, formatPeriod } from '../../data/profile';
import SectionHeading from '../common/SectionHeading';
import MonoChip from '../common/MonoChip';
import Reveal from '../common/Reveal';

const Experience = () => (
  <Box id="experience" sx={{ py: { xs: 10, md: 14 } }}>
    <Container maxWidth="lg">
      <SectionHeading
        eyebrow="03 · Track record"
        title="Trainee to senior in three years"
        subtitle="One company, three promotions — earned by shipping. Every bullet below ran in production."
      />

      <Box sx={{ position: 'relative', maxWidth: '760px' }}>
        {/* Timeline rail */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            left: { xs: 5, md: 7 },
            top: 8,
            bottom: 8,
            width: '1px',
            bgcolor: 'divider',
          }}
        />

        {experience.map((role, index) => (
          <Reveal key={role.start} delay={index * 0.08}>
            <Box
              sx={{
                position: 'relative',
                pl: { xs: 4.5, md: 6 },
                pb: index === experience.length - 1 ? 0 : { xs: 6, md: 8 },
              }}
            >
              {/* Node */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 6,
                  width: { xs: 11, md: 15 },
                  height: { xs: 11, md: 15 },
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: index === 0 ? 'primary.main' : 'divider',
                  bgcolor: index === 0 ? 'primary.main' : 'background.default',
                }}
              />

              <Typography
                sx={{
                  fontFamily: fonts.mono,
                  fontSize: '0.8rem',
                  color: 'text.secondary',
                  mb: 1,
                }}
              >
                {formatPeriod(role.start, role.end)} · {formatDuration(role.start, role.end)}
              </Typography>

              <Typography variant="h4" sx={{ fontSize: { xs: '1.3rem', md: '1.5rem' }, color: 'text.primary' }}>
                {role.title}
              </Typography>
              <Typography
                sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'primary.main', mb: 1.5 }}
              >
                {role.company}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, mb: 2 }}>
                {role.summary}
              </Typography>

              <Box component="ul" sx={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.25, mb: 2.5 }}>
                {role.achievements.map((achievement) => (
                  <Box
                    component="li"
                    key={achievement}
                    sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontFamily: fonts.mono,
                        color: 'primary.main',
                        fontSize: '0.8rem',
                        flexShrink: 0,
                      }}
                    >
                      —
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {achievement}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {role.tags.map((tag) => (
                  <MonoChip key={tag} label={tag} />
                ))}
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>
    </Container>
  </Box>
);

export default Experience;
