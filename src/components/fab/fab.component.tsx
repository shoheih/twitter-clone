import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './fab.styles';
import { FabData } from './fab.types';

const FloatingActionButton = ({ toggle }: FabData) => {
  const classes = useStyles();

  return (
    <Fab
      onClick={toggle}
      color="secondary"
      aria-label="add"
      className={classes.root}
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingActionButton;
