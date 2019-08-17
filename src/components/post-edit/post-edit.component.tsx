import React, { useState, useContext } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import AppContext from '../../contexts/AppContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './post-edit.styles';
import { PostEditType } from './post-edit.types';

const PostEdit = ({ id, body }: PostEditType) => {
  const classes = useStyles();
  const [value, setValue] = useState(body);
  const user = useContext(AppContext);

  const submitPost = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const postRef = firestore.collection('posts');
    await postRef.doc(id).set({
      body: value,
      author: { ...user },
      createdAt: new Date()
    });
    window.location.href = '/';
  };

  return (
    <form className={classes.form} onSubmit={submitPost}>
      <TextField
        multiline
        margin="normal"
        fullWidth
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button
        className={classes.button}
        variant="contained"
        disabled={false}
        color="primary"
        type="submit"
      >
        編集する
      </Button>
    </form>
  );
};

export default PostEdit;
