import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { DispUserType } from './firebase/firebase.types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import ThemeContext from './contexts/ThemeContext';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import useDarkMode from './hooks/useDarkMode';

const App = () => {
  const [user, setUser] = useState<DispUserType>({
    isLoading: true
  });
  const theme = useDarkMode();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async userAuth => {
      setUser({ isLoading: true });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setUser({
              userInfo: { ...snapShot.data(), id: snapShot.id },
              isLoading: false
            });
          });
        }
      } else {
        setUser({ isLoading: false });
      }
    });
    return unregisterAuthObserver;
  }, []);

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <MuiThemeProvider theme={theme.isDarkMode ? darkTheme : lightTheme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tweet/:id" component={Detail} />
          </Switch>
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
