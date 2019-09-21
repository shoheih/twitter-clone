import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';
import { TweetProvider } from './hooks/tweet';
import { DarkModeProvider } from './hooks/darkMode';
import { NotificationProvider } from './hooks/notification';
import { UserProvider } from './hooks/user';

const App = () => {
  return (
    <DarkModeProvider>
      <NotificationProvider>
        <UserProvider>
          <TweetProvider>
            <CssBaseline />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/tweet/:id" component={Detail} />
            </Switch>
          </TweetProvider>
        </UserProvider>
      </NotificationProvider>
    </DarkModeProvider>
  );
};

export default App;
