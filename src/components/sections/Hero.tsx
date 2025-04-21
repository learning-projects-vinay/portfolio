import { Box, Typography, Button, Container } from '@mui/material';
import { keyframes } from '@mui/system';
import Image from 'next/image';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Hero = () => {
  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        pt: { xs: 16, md: 8 }  // Increased top padding for mobile
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: { xs: 6, md: 4 },  // Increased gap for mobile
            alignItems: 'center',
            textAlign: { xs: 'center', md: 'left' }  // Center text on mobile
          }}
        >
          <Box sx={{ animation: `${fadeIn} 1s ease-out` }}>
            <Typography 
              variant="h1" 
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }  // Responsive font size
              }}
            >
              Hi, I&apos;m Vinay Panwar
            </Typography>
            <Typography 
              variant="h2" 
              color="primary" 
              gutterBottom 
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }  // Responsive font size
              }}
            >
              Node JS Developer
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 4, 
                color: 'text.secondary',
                px: { xs: 2, md: 0 }  // Add padding on mobile for better readability
              }}
            >
              Passionate about building scalable applications and solving complex problems.
              Specialized in React, Node.js, and cloud technologies.
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: { xs: 'center', md: 'flex-start' },  // Center buttons on mobile
              flexDirection: { xs: 'column', sm: 'row' },  // Stack buttons on mobile
              width: { xs: '100%', sm: 'auto' }  // Full width buttons on mobile
            }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            animation: `${fadeIn} 1s ease-out 0.3s both`
          }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: '280px', sm: '320px', md: '400px' },  // Responsive image size
                height: { xs: '280px', sm: '320px', md: '400px' },
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(47, 85, 151, 0.2)',
              }}
            >
              <Image
                src="/images/IMG-20220117-WA0003.jpg"
                alt="Vinay Panwar"
                layout="fill"
                objectFit="cover"
                priority
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;