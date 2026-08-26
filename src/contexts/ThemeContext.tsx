'use client';
import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react';
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

// The active theme lives outside React: it is the visitor's stored choice, or
// failing that their OS setting. Modelling it as an external store (rather than
// state synced in an effect) keeps the server snapshot pinned to 'light' — so the
// statically exported HTML contains the real page and hydrates without a
// mismatch — while still reacting to the toggle, to other tabs, and to the OS
// theme changing mid-visit.
const STORAGE_KEY = 'themeMode';
const listeners = new Set<() => void>();
let cached: ThemeMode | null = null;
// This visit's explicit choice. Held in memory so the toggle still works when
// localStorage is unavailable (private mode, site data blocked), where the
// write throws and re-reading storage would snap straight back to the OS theme.
let chosen: ThemeMode | null = null;

const computeMode = (): ThemeMode => {
  if (chosen) return chosen;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage throws in private mode / when site data is blocked
  }
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

// Cached so getSnapshot returns a referentially stable value on every render.
const getSnapshot = (): ThemeMode => (cached ??= computeMode());

// The server (and the hydration render) always sees light.
const getServerSnapshot = (): ThemeMode => 'light';

const notify = () => {
  cached = null;
  listeners.forEach((listener) => listener());
};

// Another tab changing the preference is an explicit choice too, so it clears
// this tab's. An OS theme change does not — it must not override a deliberate pick.
const onStorageChange = () => {
  chosen = null;
  notify();
};

const subscribe = (onStoreChange: () => void) => {
  listeners.add(onStoreChange);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', notify);
  window.addEventListener('storage', onStorageChange);
  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener('change', notify);
    window.removeEventListener('storage', onStorageChange);
  };
};

const storeMode = (mode: ThemeMode) => {
  chosen = mode;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Preference will not persist across visits, but it applies for this one.
  }
  notify();
};

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => storeMode(mode === 'light' ? 'dark' : 'light');

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
            outlined: {
              borderColor: dark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(15, 23, 42, 0.2)',
              '&:hover': {
                borderColor: dark ? '#818CF8' : '#4F46E5',
                backgroundColor: dark ? 'rgba(129, 140, 248, 0.08)' : 'rgba(79, 70, 229, 0.04)',
              },
            },
          },
          // MUI v9 removed the variant+color slots (`containedPrimary`); the
          // equivalent is a props-matched entry in `variants`.
          variants: [
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                '&:hover': {
                  backgroundColor: dark ? '#A5B0FF' : '#4338CA',
                },
              },
            },
          ],
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

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
