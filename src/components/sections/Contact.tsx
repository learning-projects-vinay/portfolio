'use client';
import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import { fonts } from '../../contexts/ThemeContext';
import { profile, withPrefix } from '../../data/profile';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';

const channels = [
  { icon: <Email />, label: profile.email, href: `mailto:${profile.email}` },
  { icon: <LinkedIn />, label: 'LinkedIn', href: profile.links.linkedin },
  { icon: <GitHub />, label: 'GitHub', href: profile.links.github },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Static hosting (GitHub Pages) has no backend — compose the mail in the
  // visitor's own client so every submission actually reaches the inbox.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio inquiry from ${formData.name}`;
    const body = `${formData.message}\n\n— ${formData.name}\n${formData.email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box id="contact" sx={{ py: { xs: 10, md: 14 }, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="05 · Next step"
          title="Let's build something that ships"
          subtitle="Hiring for a backend or AI role? Need a system designed and delivered? Tell me what you're building — I reply within 24 hours."
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 4 }}>
          <Reveal>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 1,
                }}
              >
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
                <Typography sx={{ fontFamily: fonts.mono, fontSize: '0.8rem', color: 'success.main' }}>
                  {profile.availability}
                </Typography>
              </Box>

              {channels.map((channel) => (
                <Button
                  key={channel.label}
                  variant="outlined"
                  startIcon={channel.icon}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  sx={{ justifyContent: 'flex-start', color: 'text.primary', py: 1.5 }}
                >
                  {channel.label}
                </Button>
              ))}

              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                component="a"
                href={withPrefix(profile.resumePath)}
                download="Vinay_Panwar_Resume.pdf"
                sx={{ justifyContent: 'flex-start', color: 'text.primary', py: 1.5 }}
              >
                Download résumé (PDF)
              </Button>

              <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mt: 'auto', pt: 2 }}>
                Based in {profile.location} · {profile.timezone} — comfortable overlapping with EU
                and US-East hours.
              </Typography>
            </Box>
          </Reveal>

          <Reveal delay={0.1}>
            <Card component="form" onSubmit={handleSubmit} sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Box>
                <TextField
                  required
                  fullWidth
                  label="What are you building?"
                  name="message"
                  multiline
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />}>
                    Send message
                  </Button>
                  <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary' }}>
                    Opens your mail app, pre-filled — nothing gets lost in a fake form.
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
