'use client';
import { Box, Container, Typography, Card, CardContent, Button, CardActions, Chip } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { keyframes } from '@mui/system';

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

// const shimmer = keyframes`
//   0% {
//     background-position: -1000px 0;
//   }
//   100% {
//     background-position: 1000px 0;
//   }
// `;

const projects = [
  {
    title: "Webchat",
    description: "A real-time chat application supporting room-based messaging. Features optimized event handling for improved message delivery speed.",
    tech: ["TypeScript", "JavaScript", "EJS", "CSS"],
    github: "https://github.com/Nodejs-workspace/webchat",
    category: "Web Application"
  },
  {
    title: "Express Centralized Session",
    description: "A centralized session management system that enhances security and scalability. Enables session persistence across multiple servers, reducing session inconsistency.",
    tech: ["TypeScript", "MongoDB"],
    github: "https://github.com/Nodejs-mindpath-workspace/express-centralize-session",
    category: "Backend Tool"
  }
];

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(102,126,234,0.3), transparent)'
        }
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ 
              mb: 2,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Featured Projects
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Showcasing my latest work in web development and system design
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr',
            md: 'repeat(2, 1fr)'
          }, 
          gap: 4 
        }}>
          {projects.map((project, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'rgba(102, 126, 234, 0.15)',
                animation: `${fadeIn} 0.8s ease-out ${index * 0.15}s both`,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.4s ease'
                },
                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  borderColor: '#667eea',
                  boxShadow: '0 25px 50px rgba(102, 126, 234, 0.2)',
                  '&::before': {
                    transform: 'scaleX(1)'
                  },
                  '& .project-category': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  },
                  '& .tech-badge': {
                    transform: 'translateY(-2px)'
                  }
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={project.category}
                    className="project-category"
                    size="small"
                    sx={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      color: '#667eea',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: '#1a202c'
                  }}
                >
                  {project.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ lineHeight: 1.8, mb: 3 }}
                >
                  {project.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.tech.map((tech, idx) => (
                    <Box
                      key={idx}
                      className="tech-badge"
                      sx={{
                        px: 2,
                        py: 0.75,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(102,126,234,0.08) 0%, rgba(118,75,162,0.08) 100%)',
                        border: '1px solid rgba(102,126,234,0.15)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#667eea',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 3, pt: 0, gap: 2 }}>
                <Button
                  variant="contained"
                  size="medium"
                  href={project.github}
                  target="_blank"
                  startIcon={<GitHub />}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    px: 3,
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: '0 4px 14px rgba(102,126,234,0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #64398a 100%)',
                      boxShadow: '0 6px 20px rgba(102,126,234,0.4)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  View Code
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;