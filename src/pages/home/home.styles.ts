import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(14)
    },
    grid: {
      flexGrow: 1,
      padding: theme.spacing(1)
    },
    caption: { textAlign: 'center', width: '100%' },
    progress: {
      width: '100%',
      height: '5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userArea: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatar: {
      marginRight: 10
    },
    loginAndLogoutButton: {
      marginLeft: 20
    }
  })
);

export default useStyles;
