import { Box, Container, Typography, Paper } from '@mui/material';
import { CodeRounded, Storage, Cloud, BuildCircle } from '@mui/icons-material';

const skills = [
  {
    title: "Programming Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
    icon: <CodeRounded />
  },
  {
    title: "Frameworks & Libraries",
    items: ["Express.js", "NestJS", "React", "Next.js"],
    icon: <BuildCircle />
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "MS SQL", "Influx", "Cosmos DB"],
    icon: <Storage />
  },
  {
    title: "Cloud & DevOps",
    items: ["Azure Functions", "Azure DevOps", "Docker", "CI/CD Pipelines"],
    icon: <Cloud />
  }
];

const About = () => {
  return (
    <Box
      id="about"
      sx={{
        py: 12,
        background: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%)'
          : 'linear-gradient(180deg, #141a3a 0%, #0a0e27 100%)',
        position: 'relative',
      }}
    >
      <Container>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ 
            mb: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          I Am <Box component="span" sx={{ fontStyle: 'italic' }}>Backend-Heavy Fullstack Developer</Box>
        </Typography>
        
        <Typography
          variant="h5"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '900px', mx: 'auto', fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.8 }}
        >
          I&apos;m a Backend-Heavy Fullstack Developer with over 3 years of experience specializing in API development, cloud integration, and scalable server-side solutions. Experienced with all stages of the development cycle for dynamic web projects, with strong expertise in Node.js, TypeScript, Azure, and modern backend architectures.
        </Typography>

        {/* Personal Details Section */}
        <Box sx={{ 
          mb: 8, 
          p: 4, 
          borderRadius: 4,
          background: (theme) => theme.palette.mode === 'light' ? 'white' : 'rgba(255,255,255,0.05)',
          boxShadow: '0 4px 20px rgba(102,126,234,0.08)',
          border: (theme) => theme.palette.mode === 'light'
            ? '1px solid rgba(102,126,234,0.1)'
            : '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 700,
              color: 'text.primary'
            }}
          >
            Personal Details
          </Typography>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Email:
              </Typography>
              <Typography variant="body1" color="text.primary">
                vinaypanwar9171@gmail.com
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Languages:
              </Typography>
              <Typography variant="body1" color="text.primary">
                English, Hindi
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Nationality:
              </Typography>
              <Typography variant="body1" color="text.primary">
                Indian
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Phone:
              </Typography>
              <Typography variant="body1" color="text.primary">
                +91 9171307112
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Location:
              </Typography>
              <Typography variant="body1" color="text.primary">
                Indore, Madhya Pradesh, India
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontWeight: 600 }}>
                Experience:
              </Typography>
              <Typography variant="body1" color="text.primary">
                3+ Years
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h3"
            textAlign="center"
            sx={{ 
              mb: 6,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Technical Skills
          </Typography>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 4
          }}>
            {skills.map((skill, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: 4,
                  border: '2px solid',
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    borderColor: 'primary.main',
                    boxShadow: '0 15px 35px rgba(102, 126, 234, 0.2)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: 'primary.main', mr: 1 }}>
                    {skill.icon}
                  </Box>
                  <Typography variant="h6" color="primary">
                    {skill.title}
                  </Typography>
                </Box>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {skill.items.map((item, idx) => (
                    <Typography
                      key={idx}
                      component="li"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;