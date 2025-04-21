import { Box, Container, Typography, Card, CardContent, Button, CardActions } from '@mui/material';
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

const projects = [
  {
    title: "Webchat",
    description: "A real-time chat application supporting room-based messaging. Features optimized event handling for improved message delivery speed.",
    tech: ["TypeScript", "JavaScript", "EJS", "CSS"],
    github: "https://github.com/Nodejs-workspace/webchat"
  },
  {
    title: "Express Centralized Session",
    description: "A centralized session management system that enhances security and scalability. Enables session persistence across multiple servers, reducing session inconsistency.",
    tech: ["TypeScript", "MongoDB"],
    github: "https://github.com/Nodejs-mindpath-workspace/express-centralize-session"
  }
];

const Projects = () => {
  return (
    <Box
      id="projects"
      sx={{
        py: 10,
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <Typography
          variant="h2"
          textAlign="center"
          color="primary"
          sx={{ mb: 6 }}
        >
          Featured Projects
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr',
            md: 'repeat(3, 1fr)'
          }, 
          gap: 4 
        }}>
          {projects.map((project, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                animation: `${fadeIn} 1s ease-out ${index * 0.2}s both`,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 12px 28px rgba(47, 85, 151, 0.2)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h3" gutterBottom sx={{ fontSize: '1.5rem' }}>
                  {project.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {project.tech.map((tech, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'primary.light',
                        color: 'white',
                      }}
                    >
                      {tech}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  color="primary"
                  href={project.github}
                  target="_blank"
                  startIcon={<GitHub />}
                >
                  Source Code
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