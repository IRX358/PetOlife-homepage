import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeCtx { dark: boolean; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('petolife-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('petolife-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
