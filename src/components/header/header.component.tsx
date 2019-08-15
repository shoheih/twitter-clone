import React, { useState, useContext } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import AppContext from '../../contexts/AppContext';
import useStyles from './header.styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Header = () => {
  const classes = useStyles();
  const user = useContext(AppContext);
  const [drawer, setDrawer] = useState(false);
  const handleDrawer = () => setDrawer(isOpen => !isOpen);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton
            className={classes.menuButton}
            onClick={handleDrawer}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          {user ? (
            <div className={classes.userArea}>
              <Button>
                <Avatar className={classes.avatar} src={`${user.photoURL}`} />
                <span className={classes.userName}>{user.displayName}</span>
              </Button>
              <Button
                className={classes.loginAndLogoutButton}
                onClick={() => auth.signOut()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className={classes.loginAndLogoutButton}
              onClick={signInWithGoogle}
            >
              sign in with google
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={drawer} onClick={handleDrawer}>
        <List>
          <ListItem button>
            <ListItemText secondary="Home" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
