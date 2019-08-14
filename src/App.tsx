import React, { useState, useEffect } from 'react';
import { User } from 'firebase';
import { auth } from './firebase/firebase.utils';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import theme from './theme';
import AppContext from './contexts/AppContext';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return unregisterAuthObserver;
  }, []);

  return (
    <AppContext.Provider value={user}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tweet/:id" component={Detail} />
        </Switch>
      </MuiThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
