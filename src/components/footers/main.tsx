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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
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
          <Typography variant="body1" sx={{ fontWeight: 500, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            © {new Date().getFullYear()} Vinay Panwar. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              href="https://www.linkedin.com/in/vinay-panwar-vin/"
              target="_blank"
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://github.com/vinay-panwar"
              target="_blank"
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                }
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="mailto:vinaypanwar280@gmail.com"
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
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