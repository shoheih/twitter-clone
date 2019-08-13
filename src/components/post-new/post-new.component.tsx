import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './post-new.styles';

const PostNew = () => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField
        placeholder="今の気分は？"
        multiline
        margin="normal"
        fullWidth
      />
      <Button
        className={classes.button}
        variant="contained"
        disabled={false}
        color="primary"
      >
        つぶやく
      </Button>
    </form>
  );
};

export default PostNew;
