'use client';
import { Box, Container, Typography, Card, Button } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { fonts } from '../../contexts/ThemeContext';
import { projects, Project } from '../../data/profile';
import SectionHeading from '../common/SectionHeading';
import MonoChip from '../common/MonoChip';
import Reveal from '../common/Reveal';

const CaseBlock = ({ label, text }: { label: string; text: string }) => (
  <Box>
    <Typography
      sx={{
        fontFamily: fonts.mono,
        fontSize: '0.72rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'primary.main',
        mb: 0.75,
      }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {text}
    </Typography>
  </Box>
);

const ProjectLinks = ({ project }: { project: Project }) => (
  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 3 }}>
    {project.links.map((link) => (
      <Button
        key={link.href}
        variant="outlined"
        size="small"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<GitHub sx={{ fontSize: 16 }} />}
        sx={{ color: 'text.primary', fontSize: '0.85rem' }}
      >
        {link.label}
      </Button>
    ))}
    {project.privateNote && (
      <Button
        variant="outlined"
        size="small"
        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        sx={{ color: 'text.primary', fontSize: '0.85rem' }}
      >
        {project.privateNote}
      </Button>
    )}
  </Box>
);

const ProjectHeader = ({ project }: { project: Project }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
    <Typography variant="h4" sx={{ fontSize: { xs: '1.35rem', md: '1.55rem' }, color: 'text.primary' }}>
      {project.title}
    </Typography>
    {project.flagship && (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          px: 1.25,
          py: 0.4,
          borderRadius: 50,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 13 }} />
        <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em' }}>
          FLAGSHIP · AI
        </Typography>
      </Box>
    )}
  </Box>
);

const Projects = () => {
  const [flagship, ...rest] = projects;

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 10, md: 14 },
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(148,163,184,0.025)' : 'rgba(15,23,42,0.015)'),
      }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="02 · Selected work"
          title="Projects, told like case studies"
          subtitle="Problem, build, outcome — because that's how engineering decisions should be judged."
        />

        {/* Flagship — full width */}
        <Reveal>
          <Card
            sx={{
              p: { xs: 3, md: 4.5 },
              mb: 3,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(139,150,250,0.4)' : 'rgba(79,70,229,0.35)',
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(140deg, rgba(139,150,250,0.08) 0%, rgba(16,19,27,0) 55%)'
                  : 'linear-gradient(140deg, rgba(79,70,229,0.045) 0%, rgba(255,255,255,0) 55%)',
              transition: 'transform 0.25s ease',
              '&:hover': { transform: 'translateY(-4px)' },
            }}
          >
            <ProjectHeader project={flagship} />
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: { xs: 2.5, md: 4 },
                mb: 3,
              }}
            >
              <CaseBlock label="Problem" text={flagship.problem} />
              <CaseBlock label="Build" text={flagship.build} />
              <CaseBlock label="Outcome" text={flagship.outcome} />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {flagship.tech.map((tech) => (
                <MonoChip key={tech} label={tech} />
              ))}
            </Box>
            <ProjectLinks project={flagship} />
          </Card>
        </Reveal>

        {/* Remaining case studies */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
          {rest.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <Card
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.25s ease, transform 0.25s ease',
                  '&:hover': { borderColor: 'primary.main', transform: 'translateY(-4px)' },
                }}
              >
                <ProjectHeader project={project} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3, flexGrow: 1 }}>
                  <CaseBlock label="Problem" text={project.problem} />
                  <CaseBlock label="Build" text={project.build} />
                  <CaseBlock label="Outcome" text={project.outcome} />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.tech.map((tech) => (
                    <MonoChip key={tech} label={tech} />
                  ))}
                </Box>
                <ProjectLinks project={project} />
              </Card>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
