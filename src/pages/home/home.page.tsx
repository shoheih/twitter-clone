import React, { useState, useEffect, useRef, useContext } from 'react';
import useReactRouter from 'use-react-router';
import UserContext from '../../contexts/UserContext';
import { firestore } from '../../firebase/firebase.utils';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Chat from '@material-ui/icons/Chat';
import Typography from '@material-ui/core/Typography';
import Header from '../../components/header/header.component';
import Tweet from '../../components/tweet/tweet.component';
import useStyles from './home.styles';
import ToggleContent from '../../components/toggle-content/toggle-content.component';
import Modal from '../../components/modal/modal.component';
import PostNew from '../../components/post-new/post-new.component';
import Progress from '../../components/progress/progress.component';

const Home = () => {
  const classes = useStyles();
  const { history, match } = useReactRouter();
  const user = useContext(UserContext);
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
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const isScrollBottom =
      window.innerHeight + top - document.documentElement.offsetHeight >= -200
        ? true
        : false;
    if (!isScrollBottom) return;
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
      <Container maxWidth="sm" className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.grid}
        >
          {isInitialFetching ? (
            <Progress />
          ) : (
            tweets.map(tweet => {
              const data = tweet.data();
              return (
                <Tweet
                  key={tweet.id}
                  body={data.body}
                  imgUrl={data.imgUrl}
                  createdAt={data.createdAt.toDate()}
                  authorName={data.author.displayName}
                  authorThumbnailURL={data.author.photoURL}
                  click={() => {
                    history.push(`${match.url}tweet/${tweet.id}`);
                  }}
                />
              );
            })
          )}
          <Box className={classes.progress}>
            {isMoreFetching && !isCompleteRef.current && <Progress />}
            {isCompleteRef.current && (
              <Typography variant="caption">投稿は以上です</Typography>
            )}
          </Box>
        </Grid>
        {user.userInfo && (
          <ToggleContent
            toggle={show => (
              <Fab className={classes.fab} onClick={show}>
                <Chat />
              </Fab>
            )}
            content={hide => (
              <Modal title="気になることを呟いてみよう！">
                <PostNew hide={hide} />
              </Modal>
            )}
          />
        )}
      </Container>
    </>
  );
};

export default Home;
