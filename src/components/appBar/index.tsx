"use client"

import { memo, useState } from "react"
import { Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Tooltip, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DownloadIcon from '@mui/icons-material/Download';
import { CustomMuiAppBar, MenuNavigateButton } from "./appBar.style";
import { useThemeMode, fonts } from '../../contexts/ThemeContext';
import { profile, withPrefix } from '../../data/profile';

const navigationItems = [
  { id: 'impact', label: 'Impact' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

const Wordmark = ({ onClick }: { onClick: () => void }) => (
  <Typography
    component="button"
    onClick={onClick}
    sx={{
      fontFamily: fonts.mono,
      fontSize: '0.95rem',
      fontWeight: 600,
      color: 'text.primary',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      letterSpacing: '-0.01em',
    }}
  >
    vinay
    <Box component="span" sx={{ color: 'primary.main' }}>.</Box>
    panwar
  </Typography>
);

const CustomAppBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleTheme } = useThemeMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{
      width: 280,
      bgcolor: 'background.paper',
      color: 'text.primary',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Wordmark onClick={() => scrollToSection('home')} />
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => scrollToSection(item.id)}>
              <ListItemText
                primary={item.label}
                sx={{ '& .MuiListItemText-primary': { color: 'text.primary', fontWeight: 500 } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          component="a"
          href={withPrefix(profile.resumePath)}
          download="Vinay_Panwar_Resume.pdf"
          sx={{ color: 'text.primary' }}
        >
          Résumé
        </Button>
        <Button variant="contained" onClick={() => scrollToSection('contact')}>
          Hire me
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <CustomMuiAppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box className="mobile-menu">
              <IconButton
                aria-label="open navigation"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Wordmark onClick={() => scrollToSection('home')} />
          </Box>

          <Box className="desktop-menu" sx={{ gap: 0.5 }}>
            {navigationItems.map((item) => (
              <MenuNavigateButton key={item.id} onClick={() => scrollToSection(item.id)}>
                {item.label}
              </MenuNavigateButton>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
              <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
                {mode === 'light' ? <Brightness4Icon fontSize="small" /> : <Brightness7Icon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Box className="desktop-actions" sx={{ gap: 1.5 }}>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href={withPrefix(profile.resumePath)}
                download="Vinay_Panwar_Resume.pdf"
                sx={{ color: 'text.primary' }}
              >
                Résumé
              </Button>
              <Button variant="contained" size="small" onClick={() => scrollToSection('contact')}>
                Hire me
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </CustomMuiAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            color: 'text.primary'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default memo(CustomAppBar);
