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
    textBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
      padding: theme.spacing(2)
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      marginRight: theme.spacing(2)
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
