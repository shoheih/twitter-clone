import React, { useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { UserType } from './firebase/firebase.types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import theme from './theme';
import AppContext from './contexts/AppContext';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';

const App = () => {
  const [user, setUser] = useState<UserType>(undefined);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setUser({ ...snapShot.data(), id: snapShot.id });
          });
        }
      } else {
        setUser(undefined);
      }
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
