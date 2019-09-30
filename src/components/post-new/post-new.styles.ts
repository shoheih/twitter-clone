import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginBottom: theme.spacing(5),
      position: 'relative'
    },
    progressBar: {
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    inputBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      position: 'relative'
    },
    avatarBox: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    avatar: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main
    },
    canvas: {
      maxWidth: '100%'
    },
    dispImg: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '10px'
    },
    buttonBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    label: {
      marginRight: theme.spacing(1)
    },
    icon: {
      width: '30px',
      height: '30px'
    }
  })
);

export default useStyles;
