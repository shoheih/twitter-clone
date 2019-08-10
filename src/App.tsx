import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import Home from './pages/home/home.page';

const App: React.FC = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Home />
  </MuiThemeProvider>
);

export default App;
