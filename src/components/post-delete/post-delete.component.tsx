import React from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import useStyles from './post-delete.styles';
import useReactRouter from 'use-react-router';
import { useTweet } from '../../hooks/tweet';
import { useNotification } from '../../hooks/notification';
import { PostDeleteType } from './post-delete.types';
import './post-delete.styles.scss';

const PostDelete = ({ id, imgUrl, hide }: PostDeleteType) => {
  const classes = useStyles();
  const { deleteTweet } = useTweet();
  const { history } = useReactRouter();
  const { showNotification } = useNotification();

  const handleDelete = () => {
    deleteTweet(id, imgUrl).then(() => {
      hide();
      if (history.location.state && history.location.state.isFromHome) {
        history.goBack();
      } else {
        history.push('/');
      }
      showNotification('投稿を削除しました');
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="body2" component="p" color="secondary">
        ※削除したつぶやきは元に戻せません
      </Typography>
      <Box className="rowButtons">
        <Button
          className={classes.button}
          variant="contained"
          onClick={hide}
          color="primary"
          type="button"
        >
          キャンセル
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          disabled={false}
          color="secondary"
          onClick={handleDelete}
        >
          削除する
        </Button>
      </Box>
    </div>
  );
};

export default PostDelete;
