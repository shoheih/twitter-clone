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
  const limit = 10;
  const [numberOfTweets, setNumberOfTweets] = useState(0);
  const [
    lastVisible,
    setLastVisible
  ] = useState<firebase.firestore.QueryDocumentSnapshot | null>(null);
  const [isInitialFetching, setIsInitialFetching] = useState(false);
  const [isMoreFetching, setIsMoreFetching] = useState(false);

  const getNumberOfTweet = async () => {
    const querySnapShot = await firestore.collection('posts').get();
    setNumberOfTweets(querySnapShot.docs.length);
  };

  const fetchInitialTweets = async () => {
    const postsQuerySnapShot = await firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    setLastVisible(postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1]);
    setTweets(postsQuerySnapShot.docs);
    setIsInitialFetching(false);
  };

  const fetchMoreTweets = async () => {
    const postsQuerySnapShot = await firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(limit)
      .get();
    setLastVisible(postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1]);
    setTweets(acc => [...acc, ...postsQuerySnapShot.docs]);
    setIsMoreFetching(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsMoreFetching(true);
  };

  const isCompleteInfiniteScroll = () => {
    return tweets.length === numberOfTweets;
  };

  useEffect(() => {
    getNumberOfTweet();
    setIsInitialFetching(true);
    fetchInitialTweets();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMoreFetching || isCompleteInfiniteScroll()) {
      return;
    }
    fetchMoreTweets();
    // isCompleteInfiniteScrollとfetchMoreTweetsは第二引数から除外する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoreFetching]);

  return (
    <>
      <Header />
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.root}
      >
        {isInitialFetching ? (
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
        {isMoreFetching && !isCompleteInfiniteScroll() && <CircularProgress />}
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
