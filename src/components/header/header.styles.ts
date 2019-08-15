import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    userArea: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    avatar: {
      marginRight: 10
    },
    userName: {
      color: '#fff'
    },
    loginAndLogoutButton: {
      color: '#fff',
      marginLeft: 20
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  })
);

export default useStyles;
