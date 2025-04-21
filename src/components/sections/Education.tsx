import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { keyframes } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const educationData = [
  {
    degree: "B.Tech. in Computer Science and Engineering",
    institution: "Sage University, Indore",
    period: "2019 - 2023",
    description: "Graduated with distinction, maintaining a CGPA of 8.63. Focused on computer science fundamentals, software engineering, and modern development practices."
  },
  {
    degree: "Higher Secondary Education (PCM)",
    institution: "Govt. Model H S School, Manasa",
    period: "2018 - 2019",
    description: "Completed Higher Secondary with 85.88% in Physics, Chemistry, and Mathematics (PCM)."
  }
];

const Education = () => {
  return (
    <Box
      id="education"
      sx={{
        py: 10,
        backgroundColor: 'background.paper',
      }}
    >
      <Container>
        <Typography
          variant="h2"
          textAlign="center"
          color="primary"
          sx={{ mb: 6 }}
        >
          Education
        </Typography>

        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            justifyContent: 'center'
          }}
        >
          {educationData.map((edu, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                animation: `${slideIn} 1s ease-out ${index * 0.3}s both`,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 8px 24px rgba(47, 85, 151, 0.15)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h3" color="primary" sx={{ fontSize: '1.5rem', mb: 0.5 }}>
                      {edu.degree}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {edu.institution}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  sx={{ mb: 2, fontWeight: 500 }}
                >
                  {edu.period}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {edu.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;