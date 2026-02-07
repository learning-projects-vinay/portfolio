'use client';
import { Box, Typography, Button, Container } from '@mui/material';
// import DownloadIcon from '@mui/icons-material/Download';
import { keyframes } from '@mui/system';
import Image from 'next/image';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// const slideInLeft = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(-50px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const slideInRight = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(50px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// const pulse = keyframes`
//   0%, 100% {
//     transform: scale(1);
//     opacity: 1;
//   }
//   50% {
//     transform: scale(1.05);
//     opacity: 0.8;
//   }
// `;

// const shimmer = keyframes`
//   0% {
//     background-position: -1000px 0;
//   }
//   100% {
//     background-position: 1000px 0;
//   }
// `;

const Hero = () => {
  const stats = [
    { value: '3+', label: 'Years of experience' },
    { value: '200+', label: 'APIs Developed' },
    { value: '10+', label: 'Technologies' },
    { value: '50+', label: 'Cloud Deployments' }
  ];

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 0 }
      }}
    >
      {/* Background Image - Bottom 95% */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX || ''}/images/bg-removed.png`}
          alt="Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            opacity: 0.8
          }}
          priority
        />
      </Box>

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: (theme) => theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(248,249,250,0.85) 0%, rgba(233,236,239,0.85) 100%)'
            : 'linear-gradient(135deg, rgba(15,15,35,0.82) 0%, rgba(26,26,46,0.82) 100%)',
          zIndex: 1
        }}
      />

      {/* Gradient accent overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(102,126,234,0.12) 0%, transparent 60%)',
          zIndex: 1
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'center',
            minHeight: { md: '80vh' },
            maxWidth: { md: '700px' }
          }}
        >
          {/* Content */}
          <Box 
            sx={{ 
              animation: `${fadeIn} 1s ease-out`,
              textAlign: { xs: 'center', md: 'left' },
              px: { xs: 2, md: 0 }
            }}
          >
            <Box 
              sx={{ 
                display: 'inline-block',
                px: 2.5,
                py: 0.75,
                borderRadius: 50,
                background: (theme) => theme.palette.mode === 'light'
                  ? 'rgba(102,126,234,0.1)'
                  : 'rgba(102,126,234,0.2)',
                border: '1px solid rgba(102,126,234,0.3)',
                mb: 3,
                animation: `${fadeIn} 1s ease-out 0.3s both`
              }}
            >
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#667eea',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}
              >
                👋 Hey I&apos;m Vinay
              </Typography>
            </Box>

            <Typography 
              variant="h1" 
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 900,
                mb: 2,
                lineHeight: 1.1,
                color: 'text.primary',
                animation: `${fadeIn} 1s ease-out 0.5s both`
              }}
            >
              Backend-Heavy
              <Box 
                component="span" 
                sx={{ 
                  display: 'block',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Fullstack Developer
              </Box>
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4, 
                color: 'text.secondary',
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.7,
                maxWidth: '550px',
                mx: { xs: 'auto', md: 0 },
                animation: `${fadeIn} 1s ease-out 0.7s both`
              }}
            >
              Specializing in API development, cloud integration, and scalable server-side solutions with over 3 years of experience delivering enterprise-grade applications.
            </Typography>

            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: 6,
                animation: `${fadeIn} 1s ease-out 0.9s both`
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                sx={{
                  background: (theme) => theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#c6ff00',
                  color: (theme) => theme.palette.mode === 'light' ? 'white' : '#000',
                  fontWeight: 700,
                  px: 4,
                  py: 1.75,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transition: 'left 0.5s ease'
                  },
                  '&:hover': {
                    background: (theme) => theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #5568d3 0%, #64398a 100%)'
                      : '#d4ff33',
                    transform: 'translateY(-3px)',
                    boxShadow: (theme) => theme.palette.mode === 'light'
                      ? '0 8px 25px rgba(102,126,234,0.35)'
                      : '0 8px 25px rgba(198,255,0,0.35)',
                  },
                  '&:hover::before': {
                    left: '100%'
                  }
                }}
              >
                Hire Me
              </Button>
              {/* <Button
                variant="outlined"
                size="large"
                component="a"
                href="/portfolio/resume.pdf"
                download="Vinay_Panwar_Resume.pdf"
                startIcon={<DownloadIcon />}
                sx={{
                  borderColor: (theme) => theme.palette.mode === 'light' ? '#667eea' : 'rgba(255,255,255,0.3)',
                  color: (theme) => theme.palette.mode === 'light' ? '#667eea' : 'white',
                  fontWeight: 600,
                  px: 4,
                  py: 1.75,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderWidth: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: (theme) => theme.palette.mode === 'light'
                      ? 'linear-gradient(90deg, transparent, rgba(102,126,234,0.1), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    transition: 'left 0.5s ease'
                  },
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: (theme) => theme.palette.mode === 'light' ? '#5568d3' : 'white',
                    bgcolor: (theme) => theme.palette.mode === 'light' 
                      ? 'rgba(102,126,234,0.05)' 
                      : 'rgba(255,255,255,0.05)',
                    transform: 'translateY(-3px)',
                    boxShadow: (theme) => theme.palette.mode === 'light'
                      ? '0 6px 20px rgba(102,126,234,0.2)'
                      : '0 6px 20px rgba(255,255,255,0.1)'
                  },
                  '&:hover::before': {
                    left: '100%'
                  }
                }}
              >
                Download CV
              </Button> */}
            </Box>

            {/* Stats with enhanced animations */}
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                maxWidth: '500px',
                mx: { xs: 'auto', md: 0 },
                animation: `${fadeIn} 1s ease-out 1.1s both`
              }}
            >
              {stats.map((stat, index) => (
                <Box 
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: (theme) => theme.palette.mode === 'light'
                      ? 'rgba(102,126,234,0.03)'
                      : 'rgba(102,126,234,0.05)',
                    border: '1px solid',
                    borderColor: (theme) => theme.palette.mode === 'light'
                      ? 'rgba(102,126,234,0.08)'
                      : 'rgba(102,126,234,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    animation: `${fadeIn} 0.6s ease-out ${1.1 + index * 0.15}s both`,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      background: (theme) => theme.palette.mode === 'light'
                        ? 'rgba(102,126,234,0.08)'
                        : 'rgba(102,126,234,0.12)',
                      borderColor: (theme) => theme.palette.mode === 'light'
                        ? 'rgba(102,126,234,0.2)'
                        : 'rgba(102,126,234,0.25)',
                      boxShadow: (theme) => theme.palette.mode === 'light'
                        ? '0 8px 25px rgba(102,126,234,0.15)'
                        : '0 8px 25px rgba(102,126,234,0.25)'
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: 0.5
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

          {/* Floating experience badge */}
          <Box
            sx={{
              position: { xs: 'relative', md: 'absolute' },
              top: { md: '20%' },
              right: { md: '10%' },
              mt: { xs: 4, md: 0 },
              background: (theme) => theme.palette.mode === 'light'
                ? 'rgba(255,255,255,0.95)'
                : 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
                border: (theme) => theme.palette.mode === 'light'
                  ? '1px solid rgba(102,126,234,0.2)'
                  : '1px solid rgba(255,255,255,0.15)',
                borderRadius: 3,
                p: 2,
                boxShadow: (theme) => theme.palette.mode === 'light'
                  ? '0 8px 32px rgba(102,126,234,0.15)'
                  : '0 8px 32px rgba(0,0,0,0.3)',
                zIndex: 2,
                animation: `${fadeIn} 1s ease-out 1.3s both, ${float} 4s ease-in-out 2s infinite`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: (theme) => theme.palette.mode === 'light'
                    ? '0 12px 40px rgba(102,126,234,0.25)'
                    : '0 12px 40px rgba(102,126,234,0.4)',
                  border: (theme) => theme.palette.mode === 'light'
                    ? '1px solid rgba(102,126,234,0.4)'
                    : '1px solid rgba(102,126,234,0.5)',
                }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mb: 0.5,
                  fontWeight: 600
                }}
              >
                EXP in:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['Node.js', 'Azure', 'APIs'].map((tech, index) => (
                  <Box
                    key={tech}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'white',
                      transition: 'all 0.3s ease',
                      animation: `${fadeIn} 0.5s ease-out ${1.5 + index * 0.1}s both`,
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-3px) scale(1.05)',
                        boxShadow: '0 6px 20px rgba(102,126,234,0.4)',
                        background: 'linear-gradient(135deg, #5568d3 0%, #64398a 100%)'
                      }
                    }}
                  >
                    {tech}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;