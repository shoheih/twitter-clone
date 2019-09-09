import { useState, useEffect } from 'react';

const useDarkMode = () => {
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

  return { isDarkMode, toggleTheme };
};

export default useDarkMode;
