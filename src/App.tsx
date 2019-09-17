import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { DispUserType } from './firebase/firebase.types';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import TweetContext from './contexts/TweetContext';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { DarkModeProvider } from './hooks/darkMode';
import { NotificationProvider } from './hooks/notification';

const App = () => {
  const [user, setUser] = useState<DispUserType>({
    isLoading: true
  });
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
    <DarkModeProvider>
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
    </DarkModeProvider>
  );
};

export default App;
