"use client";

import { Box, Container, Typography, IconButton, Tooltip } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import { memo } from "react";
import { fonts } from '../../contexts/ThemeContext';
import { profile, buildYear } from '../../data/profile';

const socials = [
  { icon: <LinkedIn fontSize="small" />, href: profile.links.linkedin, label: 'LinkedIn' },
  { icon: <GitHub fontSize="small" />, href: profile.links.github, label: 'GitHub' },
  { icon: <Email fontSize="small" />, href: `mailto:${profile.email}`, label: 'Email' },
];

const MainFooter = () => (
  <Box
    component="footer"
    sx={{ py: 4, borderTop: '1px solid', borderColor: 'divider' }}
  >
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.8rem', color: 'text.secondary' }}>
          © {buildYear} {profile.name} · {profile.location}
        </Typography>

        <Typography
          component="a"
          href={profile.links.source}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontFamily: fonts.mono,
            fontSize: '0.8rem',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
          }}
        >
          Built with Next.js — view source
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {socials.map((social) => (
            <Tooltip key={social.label} title={social.label}>
              <IconButton
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
);

export default memo(MainFooter);
