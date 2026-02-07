import { Box } from '@mui/material';

const SectionDivider = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '80px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1) 50%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '120px',
          height: '4px',
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          borderRadius: '2px',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
          },
          '&::before': {
            left: '-20px',
          },
          '&::after': {
            right: '-20px',
          },
        }}
      />
    </Box>
  );
};

export default SectionDivider;
