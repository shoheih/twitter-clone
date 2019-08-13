import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import theme from './theme';
import Home from './pages/home/home.page';
import Detail from './pages/detail/detail.page';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tweet/:id" component={Detail} />
    </Switch>
  </MuiThemeProvider>
);

export default App;
