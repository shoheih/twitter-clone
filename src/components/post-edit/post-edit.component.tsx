import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './post-edit.styles';
import { PostEditType } from './post-edit.types';

const PostEdit = ({ id }: PostEditType) => {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField multiline margin="normal" fullWidth />
      <Button
        className={classes.button}
        variant="contained"
        disabled={false}
        color="primary"
      >
        編集する
      </Button>
    </form>
  );
};

export default PostEdit;
