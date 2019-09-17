import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import TweetContext from './contexts/TweetContext';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { DarkModeProvider } from './hooks/darkMode';
import { NotificationProvider } from './hooks/notification';
import { UserProvider } from './hooks/user';

const App = () => {
  const tweet = useInfiniteScroll();

  return (
    <DarkModeProvider>
      <NotificationProvider>
        <UserProvider>
          <TweetContext.Provider value={tweet}>
            <CssBaseline />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/tweet/:id" component={Detail} />
            </Switch>
          </TweetContext.Provider>
        </UserProvider>
      </NotificationProvider>
    </DarkModeProvider>
  );
};

export default App;
