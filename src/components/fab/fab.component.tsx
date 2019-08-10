import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './fab.styles';

const FloatingActionButton = () => {
  const classes = useStyles();

  return (
    <Fab color="secondary" aria-label="add" className={classes.root}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingActionButton;
