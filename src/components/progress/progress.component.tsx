import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './progress.styles';

const Progress = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={40}
        thickness={4}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={40}
        thickness={4}
      />
    </Box>
  );
};

export default Progress;
