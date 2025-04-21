import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Card } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
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
        py: 10,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          textAlign="center"
          color="primary"
          sx={{ mb: 6 }}
        >
          Get In Touch
        </Typography>

        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 6
        }}>
          <Card
            sx={{
              p: 4,
              height: '100%',
              animation: `${fadeIn} 1s ease-out`,
            }}
          >
            <Typography variant="h3" color="primary" gutterBottom sx={{ fontSize: '1.75rem' }}>
              Contact Information
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Feel free to reach out to me for any questions or opportunities. I&apos;ll get back to you as soon as possible.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LinkedIn />}
                href="https://www.linkedin.com/in/vinay-panwar-vin/"
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                LinkedIn Profile
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<GitHub />}
                href="https://github.com/vinay-panwar"
                target="_blank"
                sx={{ justifyContent: 'flex-start' }}
              >
                GitHub Profile
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Email />}
                href="mailto:vinaypanwar280@gmail.com"
                sx={{ justifyContent: 'flex-start' }}
              >
                vinaypanwar280@gmail.com
              </Button>
            </Box>
          </Card>

          <Card
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 4,
              animation: `${fadeIn} 1s ease-out 0.3s both`,
            }}
          >
            <Typography variant="h3" color="primary" gutterBottom sx={{ fontSize: '1.75rem' }}>
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