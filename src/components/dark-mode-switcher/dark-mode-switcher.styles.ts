import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);

export default useStyles;
