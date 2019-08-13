import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    }
  })
);

export default useStyles;
