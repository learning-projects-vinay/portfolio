"use client"

import { memo, useState } from "react"
import { Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { CustomMuiAppBar, MenuNavigateButton } from "./appBar.style";
import { useThemeMode } from '../../contexts/ThemeContext';

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

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
      width: 250,
      bgcolor: 'background.paper',
      color: 'text.primary',
      height: '100%'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'text.primary' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(item.id)}
              sx={{ 
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: 'text.primary',
                    fontWeight: 600
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <CustomMuiAppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box className="mobile-menu" sx={{ position: 'absolute', left: 16 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          
          <Box className="desktop-menu" sx={{ display: "flex", justifyContent: "center" }}>
            {navigationItems.map((item) => (
              <MenuNavigateButton 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </MenuNavigateButton>
            ))}
          </Box>

          <Box sx={{ position: 'absolute', right: 16 }}>
            <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
              <IconButton 
                onClick={toggleTheme} 
                color="inherit"
                sx={{
                  color: 'text.primary',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(180deg)',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </CustomMuiAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: 'background.paper',
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