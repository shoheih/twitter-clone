import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative'
    },
    top: {
      color: '#656565'
    },
    bottom: {
      color: '#e7e7e7',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0
    }
  })
);

export default useStyles;
