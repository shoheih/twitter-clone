import React, { createContext, useState, useEffect, useContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const Ctx = createContext<Theme>({} as Theme);

interface ProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider = ({ children }: ProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    if (isDarkMode) {
      window.localStorage.setItem('appTheme', 'light');
      setIsDarkMode(false);
    } else {
      window.localStorage.setItem('appTheme', 'dark');
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('appTheme');
    if (localTheme) {
      setIsDarkMode(localTheme === 'dark' ? true : false);
    }
  }, []);

  return (
    <Ctx.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
      </MuiThemeProvider>
    </Ctx.Provider>
  );
};

export const useDarkMode = () => useContext(Ctx);
