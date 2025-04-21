import { Box, Container, Typography, IconButton } from '@mui/material';
import { LinkedIn, GitHub, Email } from '@mui/icons-material';
import { memo } from "react"

const MainFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
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
          <Typography variant="body2">
            © {new Date().getFullYear()} Vinay Panwar. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              href="https://www.linkedin.com/in/vinay-panwar-vin/"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://github.com/vinay-panwar"
              target="_blank"
              sx={{ color: 'white' }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="mailto:vinaypanwar280@gmail.com"
              sx={{ color: 'white' }}
            >
              <Email />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default memo(MainFooter);