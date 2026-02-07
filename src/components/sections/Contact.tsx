import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card } from '@mui/material';
import { LinkedIn, GitHub, Email, Phone } from '@mui/icons-material';
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 12,
        background: (theme) => theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%)'
          : 'linear-gradient(180deg, #141a3a 0%, #0a0e27 100%)',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ 
            mb: 8,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Get In Touch
        </Typography>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 6
        }}>
          <Card
            elevation={0}
            sx={{
              p: 4,
              height: '100%',
              background: (theme) => theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 4,
              border: '2px solid',
              borderColor: (theme) => theme.palette.mode === 'light'
                ? 'rgba(102, 126, 234, 0.2)'
                : 'rgba(102, 126, 234, 0.3)',
              animation: `${fadeIn} 1s ease-out`,
            }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.75rem', mb: 2, fontWeight: 700, color: 'primary.main' }}>
              Contact Information
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8 }}>
              Feel free to reach out to me for any questions or opportunities. I&apos;ll get back to you as soon as possible.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Email />}
                href="mailto:vinaypanwar280@gmail.com"
                sx={{ 
                  justifyContent: 'flex-start',
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                vinaypanwar280@gmail.com
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Phone />}
                href="tel:+919171307112"
                sx={{ 
                  justifyContent: 'flex-start',
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                +91 9171307112
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LinkedIn />}
                href="https://www.linkedin.com/in/vinay-panwar-vin/"
                target="_blank"
                sx={{ 
                  justifyContent: 'flex-start',
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                LinkedIn Profile
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<GitHub />}
                href="https://github.com/vinay-panwar"
                target="_blank"
                sx={{ 
                  justifyContent: 'flex-start',
                  borderWidth: 2,
                  '&:hover': { borderWidth: 2 }
                }}
              >
                GitHub Profile
              </Button>
            </Box>
          </Card>

          <Card
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              p: 4,
              background: (theme) => theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 4,
              border: '2px solid',
              borderColor: (theme) => theme.palette.mode === 'light'
                ? 'rgba(102, 126, 234, 0.2)'
                : 'rgba(102, 126, 234, 0.3)',
              animation: `${fadeIn} 1s ease-out 0.3s both`,
            }}
          >
            <Typography variant="h3" sx={{ fontSize: '1.75rem', mb: 3, fontWeight: 700, color: 'primary.main' }}>
              Send a Message
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
              <TextField
                required
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;