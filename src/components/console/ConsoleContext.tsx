'use client';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

// Lets the app bar, the hero strip and a global hotkey drive one console
// instance. The console registers its own `run` here on mount, so opening with
// a command dispatches it straight from the click handler — no effect watching
// a queued value, and no cascading render on open.
type Runner = (command: string) => void;

interface ConsoleApi {
  isOpen: boolean;
  open: (command?: string) => void;
  close: () => void;
  toggle: () => void;
  registerRunner: (runner: Runner | null) => void;
}

const ConsoleContext = createContext<ConsoleApi>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
  registerRunner: () => {},
});

export const useConsole = () => useContext(ConsoleContext);

export default function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const runner = useRef<Runner | null>(null);

  const registerRunner = useCallback((next: Runner | null) => {
    runner.current = next;
  }, []);

  const open = useCallback((command?: string) => {
    setIsOpen(true);
    if (command) runner.current?.(command);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((previous) => !previous), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle, registerRunner }),
    [isOpen, open, close, toggle, registerRunner],
  );

  return <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>;
}
