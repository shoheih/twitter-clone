import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    button: {
      color: '#fff',
      marginTop: theme.spacing(1)
    }
  })
);

export default useStyles;
