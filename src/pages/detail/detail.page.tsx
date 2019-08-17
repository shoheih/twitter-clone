import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../../components/header/header.component';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';
import useStyles from './detail.styles';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import PostEdit from '../../components/post-edit/post-edit.component';
import PostDelete from '../../components/post-delete/post-delete.component';
import useDialog from '../../hooks/useDialog';
import { DetailTypes } from './detail.types';

const Detail = ({ match }: DetailTypes) => {
  const classes = useStyles();
  const { isShowing: isEditShowing, toggle: editToggle } = useDialog();
  const { isShowing: isDeleteShowing, toggle: deleteToggle } = useDialog();
  const [tweet, setTweet] = useState<
    firebase.firestore.DocumentData | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      setIsLoading(true);
      const postsRef = firestore.collection('posts').doc(match.params.id);
      const postSnapShot = await postsRef.get();
      setTweet(postSnapShot.data());
      setIsLoading(false);
    };
    fetchTweet();
  }, []);

  return (
    <>
      <Header />
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.root}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          tweet && (
            <TweetDetail
              body={tweet.body}
              createdAt={tweet.createdAt}
              authorName={tweet.author.displayName}
              authorThumbnailURL={tweet.author.photoURL}
              editToggle={editToggle}
              deleteToggle={deleteToggle}
            />
          )
        )}
      </Grid>
      <FormDialog
        title={'つぶやきを編集しよう！'}
        content={<PostEdit id={match.params.id} />}
        isShowing={isEditShowing}
        toggle={editToggle}
      />
      <FormDialog
        title={'つぶやきを削除しますか？'}
        content={<PostDelete id={match.params.id} />}
        isShowing={isDeleteShowing}
        toggle={deleteToggle}
      />
    </>
  );
};

export default withRouter(Detail);
