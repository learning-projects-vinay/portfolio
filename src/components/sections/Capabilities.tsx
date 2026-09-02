'use client';
import { Box, Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { fonts } from '../../contexts/ThemeContext';
import { capabilities, stack } from '../../data/profile';
import MonoChip from '../common/MonoChip';

// Replaces the Rev. 02 Impact bento. The changelog now carries the narrative, so
// this section only has to answer the forward-looking question — what he can be
// hired to do — and hold the stack, which recruiters keyword-scan for.
const Capabilities = () => {
  const reduceMotion = useReducedMotion();

  // Under reduced motion the section is simply present — see Reveal for why
  // shortening the transition is not the same thing as removing it.
  const reveal = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const },
        },
      };

  return (
    <Box component="section" id="capabilities" sx={{ py: { xs: 8, md: 12 } }}>
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
          Capabilities
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.9rem', md: '2.5rem' }, color: 'text.primary', mb: { xs: 4, md: 6 } }}
        >
          What I build.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 5 },
            mb: { xs: 7, md: 10 },
          }}
        >
          {capabilities.map((capability) => (
            <motion.div
              key={capability.title}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Box sx={{ borderTop: '2px solid', borderColor: 'divider', pt: 2 }}>
                <Typography
                  variant="h3"
                  sx={{ fontSize: '1.15rem', color: 'text.primary', mb: 1 }}
                >
                  {capability.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.75 }}>
                  {capability.description}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: '0.75rem',
                    color: 'primary.main',
                  }}
                >
                  {capability.metric}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        <Typography
          sx={{
            fontFamily: fonts.mono,
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Stack
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {stack.map((group) => (
            <motion.div
              key={group.group}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '120px minmax(0, 1fr)' },
                  gap: { xs: 1, sm: 2.5 },
                  alignItems: 'baseline',
                  pb: 2.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  {group.group}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {group.items.map((item) => (
                    <MonoChip key={item} label={item} />
                  ))}
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Capabilities;
