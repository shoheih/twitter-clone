import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(10)
    },
    grid: {
      flexGrow: 1
    },
    caption: { textAlign: 'center', width: '100%' }
  })
);

export default useStyles;
