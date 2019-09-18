import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: '20px'
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconButton: {
      color: '#fff'
    }
  })
);

export default useStyles;
