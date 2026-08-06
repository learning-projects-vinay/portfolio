'use client';
import { Box, Typography } from '@mui/material';
import { fonts } from '../../contexts/ThemeContext';
import Reveal from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeading = ({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) => (
  <Reveal>
    <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: align, maxWidth: align === 'center' ? '640px' : '720px', mx: align === 'center' ? 'auto' : 0 }}>
      <Typography
        component="p"
        sx={{
          fontFamily: fonts.mono,
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'primary.main',
          mb: 1.5,
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, color: 'text.primary', mb: subtitle ? 2 : 0 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.05rem' } }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Reveal>
);

export default SectionHeading;
