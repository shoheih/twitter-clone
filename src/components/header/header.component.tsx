import React, { useState, useContext } from 'react';
import useReactRouter from 'use-react-router';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import UserContext from '../../contexts/UserContext';
import useStyles from './header.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import Mail from '@material-ui/icons/Mail';
import ExitToApp from '@material-ui/icons/ExitToApp';
import DarkModeSwitcher from '../dark-mode-switcher/dark-mode-switcher.component';

const Header = () => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const user = useContext(UserContext);
  const [drawer, setDrawer] = useState(false);
  const handleDrawer = () => setDrawer(isOpen => !isOpen);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>
          <IconButton
            className={classes.menuButton}
            onClick={handleDrawer}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <DarkModeSwitcher />
        </Toolbar>
      </AppBar>

      <Drawer open={drawer} onClick={handleDrawer}>
        <List>
          <ListItem
            button
            onClick={() => {
              history.push('/');
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText secondary="Home" />
          </ListItem>
          <ListItem button onClick={signInWithGoogle}>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText secondary="Sign in with google" />
          </ListItem>
          {user ? (
            <ListItem button onClick={() => auth.signOut()}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText secondary="Logout" />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
