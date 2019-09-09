import { createContext } from 'react';

interface Theme {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<Theme>({
  isDarkMode: false,
  toggleTheme: () => {}
});

export default ThemeContext;
