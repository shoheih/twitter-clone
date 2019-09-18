import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '50px'
    },
    button: {
      marginTop: theme.spacing(1)
    },
    canvas: {
      maxWidth: '100%'
    },
    dispImg: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '30px'
    },
    progressBar: {
      width: '100%'
    }
  })
);

export default useStyles;
