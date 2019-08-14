import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    button: {
      marginTop: theme.spacing(1)
    }
  })
);

export default useStyles;
