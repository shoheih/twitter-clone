import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(1)
    },
    caption: { textAlign: 'center', width: '100%' }
  })
);

export default useStyles;