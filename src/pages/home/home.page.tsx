import React, { useEffect, useContext } from 'react';
import useReactRouter from 'use-react-router';
import UserContext from '../../contexts/UserContext';
import TweetContext from '../../contexts/TweetContext';
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
  const {
    tweets,
    isInitialFetching,
    isMoreFetching,
    isCompleteRef,
    fetchInitialTweets,
    fetchMoreTweets,
    handleScroll
  } = useContext(TweetContext);

  useEffect(() => {
    fetchInitialTweets();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchInitialTweets, handleScroll]);

  useEffect(() => {
    if (!isMoreFetching || isCompleteRef.current) {
      return;
    }
    fetchMoreTweets();
  }, [isMoreFetching, isCompleteRef, fetchMoreTweets]);

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
                    history.push({
                      pathname: `${match.url}tweet/${tweet.id}`,
                      state: { isFromHome: true }
                    });
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
