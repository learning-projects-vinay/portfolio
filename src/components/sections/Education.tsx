'use client';
import { Box, Container, Typography, LinearProgress } from '@mui/material';
import { keyframes } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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
    institution: "Sage University",
    location: "Indore",
    period: "2019 - 2023",
    grade: "CGPA 8.63",
    percentage: 86.3,
    description: "Graduated with distinction, maintaining a CGPA of 8.63. Focused on computer science fundamentals, software engineering, and modern development practices."
  },
  {
    degree: "Higher Secondary Education (Mathematics)",
    institution: "Govt. Model H S School",
    location: "Manasa",
    period: "2018 - 2019",
    grade: "PCM Score 85.88%",
    percentage: 85.88,
    description: "Completed Higher Secondary with 85.88% in Physics, Chemistry, and Mathematics (PCM). Built strong analytical and problem-solving foundations."
  },
  {
    degree: "General Education",
    institution: "Govt. High School Alhed",
    location: "",
    period: "2016 - 2017",
    grade: "Completed",
    percentage: 83.33,
    description: "Completed secondary education with strong academic performance, establishing fundamental knowledge across various subjects."
  }
];

const Education = () => {
  return (
    <Box
      id="education"
      sx={{
        py: 12,
        background: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%)'
          : 'linear-gradient(180deg, #141a3a 0%, #0a0e27 100%)',
      }}
    >
      <Container maxWidth="lg">
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
          Education
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: '600px', mx: 'auto' }}
        >
          Academic journey and achievements
        </Typography>

        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {educationData.map((edu, index) => (
            <Box
              key={index}
              sx={{
                mb: 5,
                p: 4,
                borderRadius: 4,
                background: (theme) => theme.palette.mode === 'light'
                  ? 'white'
                  : 'rgba(255,255,255,0.05)',
                border: (theme) => theme.palette.mode === 'light'
                  ? '1px solid rgba(102,126,234,0.15)'
                  : '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 20px rgba(102,126,234,0.08)',
                animation: `${slideIn} 1s ease-out ${index * 0.3}s both`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(10px)',
                  boxShadow: '0 12px 30px rgba(102,126,234,0.15)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <SchoolIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontSize: { xs: '1.25rem', md: '1.5rem' }, 
                      mb: 0.5,
                      fontWeight: 700,
                      color: 'text.primary'
                    }}
                  >
                    {edu.degree}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      color: '#667eea',
                      mb: 0.5
                    }}
                  >
                    {edu.institution}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', md: '0.95rem' } }}
                  >
                    {edu.period} {edu.location && `• ${edu.location}`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                    border: '1px solid rgba(102,126,234,0.3)'
                  }}
                >
                  <EmojiEventsIcon sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography 
                    variant="body2" 
                    fontWeight={700}
                    sx={{ color: '#667eea' }}
                  >
                    {edu.grade}
                  </Typography>
                </Box>
              </Box>

              {/* Academic Performance Progress Bar */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.primary">
                    Academic Performance
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="#667eea">
                    {edu.percentage}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={edu.percentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: (theme) => theme.palette.mode === 'light'
                      ? 'rgba(102,126,234,0.1)'
                      : 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    }
                  }}
                />
              </Box>

              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.7,
                  color: 'text.secondary'
                }}
              >
                {edu.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;