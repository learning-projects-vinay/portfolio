'use client';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#667eea' : '#8b9ff5',
            light: mode === 'light' ? '#8b9ff5' : '#667eea',
            dark: mode === 'light' ? '#5568d3' : '#4a5fc7',
          },
          secondary: {
            main: mode === 'light' ? '#764ba2' : '#9668c4',
            light: mode === 'light' ? '#9668c4' : '#764ba2',
            dark: mode === 'light' ? '#64398a' : '#5c3a7f',
          },
          background: {
            default: mode === 'light' ? '#ffffff' : '#0a0e27',
            paper: mode === 'light' ? '#ffffff' : '#141a3a',
          },
          text: {
            primary: mode === 'light' ? '#1a202c' : '#f7fafc',
            secondary: mode === 'light' ? '#718096' : '#a0aec0',
          },
        },
        typography: {
          fontFamily: '"Raleway", "Open Sans", "Roboto", "Arial", sans-serif',
          h1: {
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 700,
          },
          h2: {
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 700,
          },
          h3: {
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 700,
          },
          h4: {
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 600,
          },
          h5: {
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 600,
          },
          h6: {
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 600,
          },
          body1: {
            fontFamily: '"Open Sans", sans-serif',
          },
          body2: {
            fontFamily: '"Open Sans", sans-serif',
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 50,
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 24px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow: mode === 'light' 
                  ? '0 4px 20px rgba(0,0,0,0.08)'
                  : '0 4px 20px rgba(0,0,0,0.3)',
              },
            },
          },
        },
      }),
    [mode]
  );

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
