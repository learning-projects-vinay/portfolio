'use client';
import { Box } from '@mui/material';
import { fonts } from '../../contexts/ThemeContext';

const MonoChip = ({ label }: { label: string }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      px: 1.25,
      py: 0.5,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.06)' : 'rgba(15,23,42,0.03)',
      fontFamily: fonts.mono,
      fontSize: '0.75rem',
      fontWeight: 500,
      color: 'text.secondary',
      lineHeight: 1.6,
      whiteSpace: 'nowrap',
      transition: 'all 0.2s ease',
      '&:hover': {
        borderColor: 'primary.main',
        color: 'primary.main',
      },
    }}
  >
    {label}
  </Box>
);

export default MonoChip;
