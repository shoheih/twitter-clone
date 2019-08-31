import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../../components/header/header.component';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';
import useStyles from './detail.styles';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import PostDelete from '../../components/post-delete/post-delete.component';
import useDialog from '../../hooks/useDialog';
import { DetailTypes } from './detail.types';

const Detail = ({ match }: DetailTypes) => {
  const classes = useStyles();
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
  }, [match.params.id]);

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
              imgUrl={tweet.imgUrl}
              createdAt={tweet.createdAt}
              authorId={tweet.author.id}
              authorName={tweet.author.displayName}
              authorThumbnailURL={tweet.author.photoURL}
              deleteToggle={deleteToggle}
            />
          )
        )}
      </Grid>
      {tweet && (
        <FormDialog
          title={'つぶやきを削除しますか？'}
          content={<PostDelete id={match.params.id} imgUrl={tweet.imgUrl} />}
          isShowing={isDeleteShowing}
          toggle={deleteToggle}
        />
      )}
    </>
  );
};

export default withRouter(Detail);
