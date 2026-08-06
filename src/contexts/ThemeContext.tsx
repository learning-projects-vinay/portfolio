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

export const fonts = {
  display: 'var(--font-grotesk), "Inter", "Helvetica", sans-serif',
  body: 'var(--font-inter), "Helvetica", "Arial", sans-serif',
  mono: 'var(--font-mono), "Menlo", "Courier New", monospace',
};

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode === 'light' || savedMode === 'dark') {
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

  const theme = useMemo(() => {
    const dark = mode === 'dark';

    return createTheme({
      palette: {
        mode,
        primary: {
          main: dark ? '#8B96FA' : '#4F46E5',
          light: dark ? '#ADB6FF' : '#6366F1',
          dark: dark ? '#6470E8' : '#4338CA',
          contrastText: dark ? '#12151C' : '#FFFFFF',
        },
        success: {
          main: dark ? '#34D399' : '#059669',
        },
        background: {
          default: dark ? '#12151C' : '#F4F5F7',
          paper: dark ? '#181C25' : '#FFFFFF',
        },
        text: {
          primary: dark ? '#E4E7EE' : '#1D2433',
          secondary: dark ? '#A3ABBD' : '#57647A',
        },
        divider: dark ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.12)',
      },
      typography: {
        fontFamily: fonts.body,
        h1: {
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
        },
        h2: {
          fontFamily: fonts.display,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        },
        h3: {
          fontFamily: fonts.display,
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
        h4: { fontFamily: fonts.display, fontWeight: 600 },
        h5: { fontFamily: fonts.display, fontWeight: 600 },
        h6: { fontFamily: fonts.display, fontWeight: 600 },
        body1: { lineHeight: 1.75 },
        body2: { lineHeight: 1.7 },
        button: { fontWeight: 600, letterSpacing: 0 },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              textTransform: 'none',
              fontWeight: 600,
              padding: '10px 22px',
              boxShadow: 'none',
              transition: 'all 0.2s ease',
              '&:hover': { boxShadow: 'none' },
            },
            containedPrimary: {
              '&:hover': {
                backgroundColor: dark ? '#A5B0FF' : '#4338CA',
              },
            },
            outlined: {
              borderColor: dark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(15, 23, 42, 0.2)',
              '&:hover': {
                borderColor: dark ? '#818CF8' : '#4F46E5',
                backgroundColor: dark ? 'rgba(129, 140, 248, 0.08)' : 'rgba(79, 70, 229, 0.04)',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              boxShadow: 'none',
              backgroundImage: 'none',
              border: '1px solid',
              borderColor: dark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.1)',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: { backgroundImage: 'none' },
          },
        },
      },
    });
  }, [mode]);

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
