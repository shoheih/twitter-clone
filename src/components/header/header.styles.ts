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
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  })
);

export default useStyles;
