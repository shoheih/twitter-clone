import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import FloatingActionButton from '../../components/floating-action-button/floating-action-button.component';
import Tweet from '../../components/tweet/tweet.component';
import useStyles from './home.styles';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import PostNew from '../../components/post-new/post-new.component';
import useDialog from '../../hooks/useDialog';
import CircularProgress from '@material-ui/core/CircularProgress';

const Home = () => {
  const classes = useStyles();
  const { isShowing, toggle } = useDialog();
  const [tweets, setTweets] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      setIsLoading(true);
      const postsRef = firestore.collection('posts');
      const postsQuerySnapShot = await postsRef
        .orderBy('createdAt', 'desc')
        .get();
      setTweets(postsQuerySnapShot.docs);
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
          tweets.map(tweet => {
            const data = tweet.data();
            return (
              <Tweet
                key={tweet.id}
                id={tweet.id}
                body={data.body}
                createdAt={data.createdAt}
                authorName={data.author.displayName}
                authorThumbnailURL={data.author.photoURL}
              />
            );
          })
        )}
      </Grid>
      <FloatingActionButton toggle={toggle} />
      <FormDialog
        title={'気になることをつぶやいてみよう！'}
        content={<PostNew toggle={toggle} />}
        isShowing={isShowing}
        toggle={toggle}
      />
    </>
  );
};

export default Home;
