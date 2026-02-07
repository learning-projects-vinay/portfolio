"use client";

import { Box, Container, Typography, IconButton } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import { memo } from "react";

const MainFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        background: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: (theme) => theme.palette.mode === 'light' ? 'white' : 'text.primary',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500, 
              textShadow: (theme) => theme.palette.mode === 'light'
                ? '0 2px 4px rgba(0,0,0,0.1)'
                : '0 2px 4px rgba(0,0,0,0.3)',
              color: 'inherit'
            }}
          >
            © {new Date().getFullYear()} Vinay Panwar. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              href="https://www.linkedin.com/in/vinay-panwar-vin/"
              target="_blank"
              sx={{ 
                color: (theme) => theme.palette.mode === 'light' ? 'white' : 'text.primary',
                bgcolor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(102,126,234,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(102,126,234,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 5px 15px rgba(0,0,0,0.2)'
                    : '0 5px 15px rgba(102,126,234,0.3)'
                }
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://github.com/vinay-panwar"
              target="_blank"
              sx={{ 
                color: (theme) => theme.palette.mode === 'light' ? 'white' : 'text.primary',
                bgcolor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(102,126,234,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(102,126,234,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 5px 15px rgba(0,0,0,0.2)'
                    : '0 5px 15px rgba(102,126,234,0.3)'
                }
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="mailto:vinaypanwar280@gmail.com"
              sx={{ 
                color: (theme) => theme.palette.mode === 'light' ? 'white' : 'text.primary',
                bgcolor: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(102,126,234,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: (theme) => theme.palette.mode === 'light'
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(102,126,234,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 5px 15px rgba(0,0,0,0.2)'
                    : '0 5px 15px rgba(102,126,234,0.3)'
                }
              }}
            >
              <Email />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(MainFooter);