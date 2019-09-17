import React, { useState } from 'react';
import useReactRouter from 'use-react-router';
import {
  auth,
  signInWithGoogle,
  signInWithSampleUser
} from '../../firebase/firebase.utils';
import { useUser } from '../../hooks/user';
import useStyles from './header.styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
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
import Progress from '../../components/progress/progress.component';

const Header = () => {
  const classes = useStyles();
  const user = useUser();
  const { history } = useReactRouter();
  const [drawer, setDrawer] = useState(false);
  const handleDrawer = () => setDrawer(isOpen => !isOpen);

  const renderLoginUser = () => {
    if (user.isLoading) {
      return <Progress />;
    }

    if (user.userInfo) {
      return (
        <Box className={classes.center}>
          <Avatar
            className={classes.avatar}
            src={`${user.userInfo.photoURL}`}
          />
          <span>{user.userInfo.displayName}</span>
        </Box>
      );
    } else {
      return (
        <Button
          className={classes.loginAndLogoutButton}
          onClick={signInWithSampleUser}
        >
          匿名ユーザーでログイン
        </Button>
      );
    }
  };

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
          {renderLoginUser()}
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
            <ListItemText secondary="ホーム" />
          </ListItem>
          {user.userInfo ? (
            <ListItem button onClick={() => auth.signOut()}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText secondary="ログアウト" />
            </ListItem>
          ) : (
            <>
              <ListItem button onClick={signInWithGoogle}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText secondary="Googleアカウントでログイン" />
              </ListItem>
              <ListItem button onClick={signInWithSampleUser}>
                <ListItemIcon>
                  <Mail />
                </ListItemIcon>
                <ListItemText secondary="匿名ユーザーでログイン" />
              </ListItem>
            </>
          )}
          <ListItem>
            <DarkModeSwitcher />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
