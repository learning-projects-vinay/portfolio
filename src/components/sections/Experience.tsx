import { Box, Container, Typography, Paper } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, 
  TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const experiences = [
  {
    title: "Software Developer",
    company: "Mindpath Tech",
    period: "Dec 2022 – Present",
    description: [
      "Developed 200+ RESTful APIs, improving backend efficiency",
      "Integrated Azure cloud services, leveraging Azure Functions and Processors to enhance scalability",
      "Implemented CI/CD pipelines via Azure DevOps, reducing deployment time",
      "Designed and developed web applications using static rendering, EJS, and modern frameworks",
      "Used Docker for containerization, ensuring cross-environment consistency",
      "Collaborated with cross-functional teams and directly communicated with clients to optimize project outcomes"
    ]
  }
];

const Experience = () => {
  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          textAlign="center"
          color="primary"
          sx={{ 
            mb: { xs: 4, md: 6 },
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Professional Experience
        </Typography>

        <Timeline 
          position="alternate"
          sx={{
            [`@media (max-width:600px)`]: {
              '.MuiTimelineItem-root': {
                minHeight: 'auto',
                '&:before': {
                  display: 'none' // Hide the timeline padding on mobile
                }
              },
              '.MuiTimelineContent-root': {
                px: 2 // Reduce padding on mobile
              }
            }
          }}
        >
          {experiences.map((exp, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index !== experiences.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    backgroundColor: 'background.default',
                    animation: `${fadeInUp} 1s ease-out ${index * 0.2}s both`,
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease',
                      boxShadow: '0 8px 24px rgba(47, 85, 151, 0.15)',
                    },
                  }}
                >
                  <Typography 
                    variant="h3" 
                    color="primary" 
                    sx={{ 
                      fontSize: { xs: '1.25rem', md: '1.5rem' }, 
                      mb: 1,
                      wordBreak: 'break-word'
                    }}
                  >
                    {exp.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      wordBreak: 'break-word'
                    }}
                  >
                    {exp.company} | {exp.period}
                  </Typography>
                  <Box 
                    component="ul" 
                    sx={{ 
                      m: 0, 
                      pl: { xs: 2, sm: 3 },
                      '& li': {
                        mb: { xs: 1.5, md: 1 }
                      }
                    }}
                  >
                    {exp.description.map((item, idx) => (
                      <Typography
                        key={idx}
                        component="li"
                        variant="body1"
                        sx={{ 
                          fontSize: { xs: '0.9rem', md: '1.125rem' },
                          lineHeight: 1.6
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

export default Experience;