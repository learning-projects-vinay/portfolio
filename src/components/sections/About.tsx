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
        py: 10,
        backgroundColor: 'background.default',
      }}
    >
      <Container>
        <Typography
          variant="h2"
          textAlign="center"
          color="primary"
          sx={{ mb: 2 }}
        >
          About Me
        </Typography>
        
        <Typography
          variant="h5"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          I am a motivated and detail-oriented Software Developer who enjoys building scalable and efficient applications.
          I thrive in collaborative environments, always eager to learn and take on new challenges. Passionate about
          problem-solving, I focus on creating smooth and effective solutions that make a real impact.
        </Typography>

        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h3"
            textAlign="center"
            color="primary"
            sx={{ mb: 4 }}
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
                elevation={1}
                sx={{
                  p: 3,
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 8px 24px rgba(47, 85, 151, 0.15)',
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