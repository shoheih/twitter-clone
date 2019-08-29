import React, { useState, useEffect, useRef } from 'react';
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
  const LIMIT = 10;
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [isMoreFetching, setIsMoreFetching] = useState(false);
  const isCompleteRef = useRef<boolean>(false);
  const lastVisibleRef = useRef<firebase.firestore.QueryDocumentSnapshot | null>(
    null
  );

  const fetchInitialTweets = async () => {
    const postsQuerySnapShot = await firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(LIMIT + 1)
      .get();
    if (postsQuerySnapShot.docs.length < LIMIT + 1) {
      isCompleteRef.current = true;
      lastVisibleRef.current =
        postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1];
      setTweets(postsQuerySnapShot.docs);
    } else {
      lastVisibleRef.current =
        postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 2];
      setTweets(postsQuerySnapShot.docs.slice(0, LIMIT));
    }
    setIsInitialFetching(false);
  };

  const fetchMoreTweets = async () => {
    const postsQuerySnapShot = await firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisibleRef.current)
      .limit(LIMIT + 1)
      .get();
    if (postsQuerySnapShot.docs.length < LIMIT + 1) {
      isCompleteRef.current = true;
      lastVisibleRef.current =
        postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1];
      setTweets(acc => [...acc, ...postsQuerySnapShot.docs]);
    } else {
      lastVisibleRef.current =
        postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 2];
      setTweets(acc => [...acc, ...postsQuerySnapShot.docs.slice(0, LIMIT)]);
    }
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

  useEffect(() => {
    fetchInitialTweets();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMoreFetching || isCompleteRef.current) {
      return;
    }
    fetchMoreTweets();
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
                imgUrl={data.imgUrl}
                createdAt={data.createdAt}
                authorName={data.author.displayName}
                authorThumbnailURL={data.author.photoURL}
              />
            );
          })
        )}
        {isMoreFetching && !isCompleteRef.current && <CircularProgress />}
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
