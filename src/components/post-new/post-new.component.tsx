import React, { useState, useContext } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import AppContext from '../../contexts/AppContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './post-new.styles';
import { PostNewTypes } from './post-new.types';

const PostNew = ({ toggle }: PostNewTypes) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const user = useContext(AppContext);

  const submitPost = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const postRef = firestore.collection('posts');
    await postRef.doc().set({
      body: value,
      author: { ...user },
      createdAt: new Date()
    });
    toggle();
  };

  return (
    <form className={classes.form} onSubmit={submitPost}>
      <TextField
        placeholder="今の気分は？"
        multiline
        margin="normal"
        fullWidth
        value={value}
        onChange={e => setValue(e.target.value)}
        name="body"
      />
      <Button
        className={classes.button}
        variant="contained"
        disabled={!value.match(/\S/g) ? true : false}
        color="primary"
        type="submit"
      >
        つぶやく
      </Button>
    </form>
  );
};

export default PostNew;
