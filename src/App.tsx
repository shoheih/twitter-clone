import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { DispUserType } from './firebase/firebase.types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import TweetContext from './contexts/TweetContext';
import ThemeContext from './contexts/ThemeContext';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useDarkMode from './hooks/useDarkMode';
import { NotificationProvider } from './hooks/notification';

const App = () => {
  const [user, setUser] = useState<DispUserType>({
    isLoading: true
  });
  const theme = useDarkMode();
  const tweet = useInfiniteScroll();

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
    <ThemeContext.Provider value={theme}>
      <MuiThemeProvider theme={theme.isDarkMode ? darkTheme : lightTheme}>
        <NotificationProvider>
          <UserContext.Provider value={user}>
            <TweetContext.Provider value={tweet}>
              <CssBaseline />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/tweet/:id" component={Detail} />
              </Switch>
            </TweetContext.Provider>
          </UserContext.Provider>
        </NotificationProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
