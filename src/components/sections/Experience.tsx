'use client';
import { Box, Container, Typography } from '@mui/material';
import { keyframes } from '@mui/system';
import { useState } from 'react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const experiences = [
  {
    year: "2025",
    title: "Senior Software Engineer",
    company: "Mindpath",
    period: "Dec 2025 - Present",
    duration: "3 months",
    type: "Leadership & Architecture",
    color: '#667eea',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    achievements: [
      "Leading software infrastructure and architecture decisions",
      "Managing cross-functional project teams and client relationships",
      "Architecting scalable solutions using Azure cloud services",
      "Mentoring junior developers and conducting code reviews"
    ],
    tags: ["Leadership", "Azure", "Architecture", "Mentoring"]
  },
  {
    year: "2023",
    title: "Software Developer",
    company: "Mindpath",
    period: "Jul 2023 - Dec 2025",
    duration: "2.5 years",
    type: "Development & Integration",
    color: '#764ba2',
    gradient: 'linear-gradient(135deg, #764ba2 0%, #8b5cf6 100%)',
    achievements: [
      "Developed 200+ RESTful APIs improving backend efficiency by 40%",
      "Integrated Azure cloud services leveraging Functions and Processors",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Designed scalable web applications using modern frameworks"
    ],
    tags: ["APIs", "Azure", "CI/CD", "Agile"]
  },
  {
    year: "2022",
    title: "Software Developer Trainee",
    company: "Mindpath",
    period: "Dec 2022 - Jun 2023",
    duration: "7 months",
    type: "Learning & Building",
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
    achievements: [
      "Built and optimized RESTful APIs for better backend performance",
      "Worked with Azure Functions for scalable serverless solutions",
      "Set up CI/CD pipelines using Azure DevOps",
      "Gained experience with agile methodologies and Git workflows"
    ],
    tags: ["Express.js", "MongoDB", "Docker", "Git"]
  }
];

const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 10, md: 16 },
        background: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)'
          : 'linear-gradient(180deg, #0f0f23 0%, #1a1a2e 50%, #0f0f23 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 0.03,
          borderRadius: '50%',
          filter: 'blur(120px)',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'linear-gradient(135deg, #764ba2 0%, #8b5cf6 100%)',
          opacity: 0.03,
          borderRadius: '50%',
          filter: 'blur(140px)',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 60%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${fadeInUp} 1s ease-out`
            }}
          >
            Journey Timeline
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.2rem' },
              maxWidth: '700px',
              mx: 'auto',
              animation: `${fadeInUp} 1s ease-out 0.2s both`
            }}
          >
            A 3-year evolution from trainee to senior engineer, building 200+ APIs and leading cloud architecture
          </Typography>
        </Box>

        {/* Flowing Timeline */}
        <Box sx={{ position: 'relative', maxWidth: '1100px', mx: 'auto' }}>
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const delay = index * 0.3;

            return (
              <Box
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  position: 'relative',
                  mb: { xs: 12, md: 16 },
                  '&:last-child': { mb: 0 }
                }}
              >
                {/* Desktop Layout */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: isEven ? '5fr 1fr 5fr' : '5fr 1fr 5fr',
                      gap: 6,
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Left Side */}
                    {isEven ? (
                      <Box
                        sx={{
                          textAlign: 'right',
                          animation: `${slideInLeft} 1s ease-out ${delay}s both`
                        }}
                      >
                        {/* Year Badge */}
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 3,
                            py: 1,
                            borderRadius: 3,
                            background: exp.gradient,
                            mb: 2,
                            boxShadow: `0 8px 25px ${exp.color}30`,
                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              color: 'white',
                              fontWeight: 900,
                              fontSize: '2rem',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {exp.year}
                          </Typography>
                        </Box>

                        {/* Title & Company */}
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: { md: '2rem', lg: '2.5rem' },
                            fontWeight: 800,
                            color: 'text.primary',
                            mb: 1,
                            lineHeight: 1.2
                          }}
                        >
                          {exp.title}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: exp.color,
                            mb: 2
                          }}
                        >
                          {exp.company}
                        </Typography>

                        {/* Metadata */}
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 600,
                              fontSize: '1.05rem',
                              mb: 0.5
                            }}
                          >
                            {exp.period}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: exp.color,
                              fontWeight: 700,
                              fontSize: '1rem'
                            }}
                          >
                            {exp.duration} • {exp.type}
                          </Typography>
                        </Box>

                        {/* Achievements */}
                        <Box sx={{ textAlign: 'right' }}>
                          {exp.achievements.map((achievement, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mb: 1.5,
                                opacity: hoveredIndex === index ? 1 : 0.7,
                                transform: hoveredIndex === index ? 'translateX(-5px)' : 'translateX(0)',
                                transition: `all 0.3s ease ${idx * 0.1}s`
                              }}
                            >
                              <Box
                                sx={{
                                  maxWidth: '450px',
                                  borderRight: `3px solid ${exp.color}`,
                                  pr: 2,
                                  py: 0.5
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.7,
                                    fontSize: '1.05rem'
                                  }}
                                >
                                  {achievement}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        {/* Tags */}
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            flexWrap: 'wrap',
                            justifyContent: 'flex-end',
                            mt: 3
                          }}
                        >
                          {exp.tags.map((tag) => (
                            <Box
                              key={tag}
                              sx={{
                                px: 2,
                                py: 0.75,
                                borderRadius: 2,
                                background: `${exp.color}15`,
                                border: `1.5px solid ${exp.color}40`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: `${exp.color}25`,
                                  borderColor: exp.color,
                                  transform: 'translateY(-2px)'
                                }
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: exp.color,
                                  fontWeight: 700,
                                  fontSize: '0.85rem'
                                }}
                              >
                                {tag}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      <Box />
                    )}

                    {/* Center Dot */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                      {/* Connecting Line */}
                      {index < experiences.length - 1 && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '200px',
                            background: `linear-gradient(180deg, ${exp.color} 0%, ${experiences[index + 1]?.color || exp.color} 100%)`,
                            opacity: 0.3,
                            zIndex: 0
                          }}
                        />
                      )}

                      {/* Main Dot */}
                      <Box
                        sx={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          background: exp.gradient,
                          boxShadow: hoveredIndex === index
                            ? `0 0 60px ${exp.color}60, 0 0 100px ${exp.color}40`
                            : `0 0 30px ${exp.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          zIndex: 2,
                          transform: hoveredIndex === index ? 'scale(1.3)' : 'scale(1)',
                          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: '-10px',
                            borderRadius: '50%',
                            border: `2px solid ${exp.color}`,
                            opacity: hoveredIndex === index ? 0.4 : 0,
                            transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)',
                            transition: 'all 0.5s ease'
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            inset: '-20px',
                            borderRadius: '50%',
                            border: `1px solid ${exp.color}`,
                            opacity: hoveredIndex === index ? 0.2 : 0,
                            transform: hoveredIndex === index ? 'scale(1.4)' : 'scale(1)',
                            transition: 'all 0.6s ease'
                          }
                        }}
                      >
                        <Typography
                          variant="h2"
                          sx={{
                            color: 'white',
                            fontWeight: 900,
                            fontSize: '2.5rem'
                          }}
                        >
                          {experiences.length - index}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Right Side */}
                    {!isEven ? (
                      <Box
                        sx={{
                          textAlign: 'left',
                          animation: `${slideInRight} 1s ease-out ${delay}s both`
                        }}
                      >
                        {/* Year Badge */}
                        <Box
                          sx={{
                            display: 'inline-block',
                            px: 3,
                            py: 1,
                            borderRadius: 3,
                            background: exp.gradient,
                            mb: 2,
                            boxShadow: `0 8px 25px ${exp.color}30`,
                            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              color: 'white',
                              fontWeight: 900,
                              fontSize: '2rem',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {exp.year}
                          </Typography>
                        </Box>

                        {/* Title & Company */}
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: { md: '2rem', lg: '2.5rem' },
                            fontWeight: 800,
                            color: 'text.primary',
                            mb: 1,
                            lineHeight: 1.2
                          }}
                        >
                          {exp.title}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: exp.color,
                            mb: 2
                          }}
                        >
                          {exp.company}
                        </Typography>

                        {/* Metadata */}
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 600,
                              fontSize: '1.05rem',
                              mb: 0.5
                            }}
                          >
                            {exp.period}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: exp.color,
                              fontWeight: 700,
                              fontSize: '1rem'
                            }}
                          >
                            {exp.duration} • {exp.type}
                          </Typography>
                        </Box>

                        {/* Achievements */}
                        <Box>
                          {exp.achievements.map((achievement, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                mb: 1.5,
                                opacity: hoveredIndex === index ? 1 : 0.7,
                                transform: hoveredIndex === index ? 'translateX(5px)' : 'translateX(0)',
                                transition: `all 0.3s ease ${idx * 0.1}s`
                              }}
                            >
                              <Box
                                sx={{
                                  maxWidth: '450px',
                                  borderLeft: `3px solid ${exp.color}`,
                                  pl: 2,
                                  py: 0.5
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.7,
                                    fontSize: '1.05rem'
                                  }}
                                >
                                  {achievement}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Box>

                        {/* Tags */}
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 1,
                            flexWrap: 'wrap',
                            mt: 3
                          }}
                        >
                          {exp.tags.map((tag) => (
                            <Box
                              key={tag}
                              sx={{
                                px: 2,
                                py: 0.75,
                                borderRadius: 2,
                                background: `${exp.color}15`,
                                border: `1.5px solid ${exp.color}40`,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: `${exp.color}25`,
                                  borderColor: exp.color,
                                  transform: 'translateY(-2px)'
                                }
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{
                                  color: exp.color,
                                  fontWeight: 700,
                                  fontSize: '0.85rem'
                                }}
                              >
                                {tag}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      <Box />
                    )}
                  </Box>
                </Box>

                {/* Mobile Layout */}
                <Box
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    animation: `${fadeInUp} 1s ease-out ${delay}s both`
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    {/* Vertical Line & Dot */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: exp.gradient,
                          boxShadow: `0 0 25px ${exp.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            color: 'white',
                            fontWeight: 900
                          }}
                        >
                          {experiences.length - index}
                        </Typography>
                      </Box>
                      {index < experiences.length - 1 && (
                        <Box
                          sx={{
                            width: '3px',
                            flex: 1,
                            minHeight: '150px',
                            background: `linear-gradient(180deg, ${exp.color} 0%, ${experiences[index + 1]?.color} 100%)`,
                            opacity: 0.3,
                            mt: 2
                          }}
                        />
                      )}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, pb: 6 }}>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 2,
                          py: 0.75,
                          borderRadius: 2,
                          background: exp.gradient,
                          mb: 2
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1.5rem'
                          }}
                        >
                          {exp.year}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: '1.75rem',
                          fontWeight: 800,
                          color: 'text.primary',
                          mb: 0.5
                        }}
                      >
                        {exp.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: exp.color,
                          mb: 2
                        }}
                      >
                        {exp.company}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 0.5 }}>
                        {exp.period}
                      </Typography>
                      <Typography variant="body2" sx={{ color: exp.color, fontWeight: 700, mb: 3 }}>
                        {exp.duration} • {exp.type}
                      </Typography>

                      {exp.achievements.map((achievement, idx) => (
                        <Box key={idx} sx={{ display: 'flex', mb: 1.5 }}>
                          <Box
                            sx={{
                              borderLeft: `2px solid ${exp.color}`,
                              pl: 2,
                              py: 0.25
                            }}
                          >
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                              {achievement}
                            </Typography>
                          </Box>
                        </Box>
                      ))}

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                        {exp.tags.map((tag) => (
                          <Box
                            key={tag}
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1.5,
                              background: `${exp.color}15`,
                              border: `1px solid ${exp.color}40`
                            }}
                          >
                            <Typography variant="caption" sx={{ color: exp.color, fontWeight: 700 }}>
                              {tag}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;