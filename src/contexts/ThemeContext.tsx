import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: Theme = {
  mode: 'light',
  primaryColor: '#3b82f6',
};

// Function to get system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiui-theme');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed;
        } catch {
          // If parsing fails, use system preference
          const systemTheme = getSystemTheme();
          return { ...defaultTheme, mode: systemTheme };
        }
      }
      // If no saved theme, use system preference
      const systemTheme = getSystemTheme();
      return { ...defaultTheme, mode: systemTheme };
    }
    return defaultTheme;
  });

  // Apply theme to document
  const applyTheme = (themeMode: 'light' | 'dark') => {
    if (typeof window !== 'undefined') {
      if (themeMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme.mode);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aiui-theme', JSON.stringify(theme));
      applyTheme(theme.mode);
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        // Only auto-update if user hasn't manually set a theme
        const saved = localStorage.getItem('aiui-theme');
        if (!saved) {
          setThemeState(prev => ({
            ...prev,
            mode: e.matches ? 'dark' : 'light',
          }));
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setThemeState(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
