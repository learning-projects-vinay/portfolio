'use client';
import { Box, Container, Typography,Grid, Card, CardContent } from '@mui/material';
import { keyframes } from '@mui/system';
import ApiIcon from '@mui/icons-material/Api';
import CloudIcon from '@mui/icons-material/Cloud';
import WebIcon from '@mui/icons-material/Web';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const services = [
  {
    icon: <ApiIcon sx={{ fontSize: 60 }} />,
    title: 'API Development',
    description: 'Design and build robust RESTful APIs with Node.js, Express, and FastAPI. Focus on scalability, security, and comprehensive documentation.',
    technologies: ['Node.js', 'Express', 'FastAPI', 'REST', 'GraphQL']
  },
  {
    icon: <CloudIcon sx={{ fontSize: 60 }} />,
    title: 'Cloud Integration',
    description: 'Deploy and manage cloud infrastructure on Azure, including App Services, Functions, Storage, and containerized applications with Docker.',
    technologies: ['Azure', 'Docker', 'CI/CD', 'Cloud Storage', 'App Services']
  },
  {
    icon: <WebIcon sx={{ fontSize: 60 }} />,
    title: 'Web Applications',
    description: 'Build modern, responsive web applications using React, Next.js, and TypeScript with focus on performance and user experience.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Material-UI', 'Redux']
  },
  {
    icon: <AccountTreeIcon sx={{ fontSize: 60 }} />,
    title: 'CI/CD Pipelines',
    description: 'Automate deployment workflows using Azure DevOps, GitHub Actions, and Jenkins for continuous integration and delivery.',
    technologies: ['Azure DevOps', 'GitHub Actions', 'Jenkins', 'Docker', 'Git']
  }
];

export default function Services() {
  return (
    <Box
      id="services"
      sx={{
        py: 10,
        background: 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            What I Do
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.7
            }}
          >
            Specialized in building scalable web solutions with modern technologies and cloud platforms
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  background: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(102,126,234,0.15)',
                    '& .service-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box 
                    className="service-icon"
                    sx={{ 
                      mb: 3, 
                      color: '#667eea',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      color: '#1a202c'
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'text.secondary',
                      mb: 3,
                      lineHeight: 1.8
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {service.technologies.map((tech, techIndex) => (
                      <Box
                        key={techIndex}
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 50,
                          background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                          border: '1px solid rgba(102,126,234,0.2)',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#667eea'
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
