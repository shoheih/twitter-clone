import React from 'react';
import { firestore, storage } from '../../firebase/firebase.utils';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './post-delete.styles';
import { PostDeleteType } from './post-delete.types';

const PostDelete = ({ id, imgUrl }: PostDeleteType) => {
  const classes = useStyles();

  const deleteImage = async () => {
    if (!imgUrl) return;
    const storageRef = storage.refFromURL(imgUrl);
    return storageRef.delete();
  };

  const handleDelete = async () => {
    await deleteImage();
    await firestore
      .collection('posts')
      .doc(id)
      .delete();

    window.location.href = '/';
  };

  return (
    <div className={classes.root}>
      <Typography variant="body2" component="p" color="secondary">
        ※削除したつぶやきは元に戻せません
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        disabled={false}
        color="secondary"
        onClick={handleDelete}
      >
        削除する
      </Button>
    </div>
  );
};

export default PostDelete;
