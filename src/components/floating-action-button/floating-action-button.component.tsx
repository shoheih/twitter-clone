import React from 'react';
import Fab from '@material-ui/core/Fab';
import Chat from '@material-ui/icons/Chat';
import useStyles from './floating-action-button.styles';
import { FabData } from './floating-action-button.types';

const FloatingActionButton = ({ toggle }: FabData) => {
  const classes = useStyles();

  return (
    <Fab
      onClick={toggle}
      color="secondary"
      aria-label="add"
      className={classes.root}
    >
      <Chat />
    </Fab>
  );
};

export default FloatingActionButton;
