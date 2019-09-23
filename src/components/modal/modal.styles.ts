import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '50px',
      position: 'fixed',
      top: '10px',
      left: '10px'
    }
  })
);

export default useStyles;
