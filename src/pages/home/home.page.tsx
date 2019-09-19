import React, { useEffect, useContext } from 'react';
import { useUser } from '../../hooks/user';
import useReactRouter from 'use-react-router';
import TweetContext from '../../contexts/TweetContext';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Header from '../../components/header/header.component';
import Tweet from '../../components/tweet/tweet.component';
import useStyles from './home.styles';
import PostNew from '../../components/post-new/post-new.component';
import Progress from '../../components/progress/progress.component';

const Home = () => {
  const classes = useStyles();
  const user = useUser();
  const { history, match } = useReactRouter();
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
          {user.userInfo && <PostNew />}
          {isInitialFetching ? (
            <Progress />
          ) : (
            tweets.map(tweet => {
              const data = tweet.data();
              if (!data) return;
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
      </Container>
    </>
  );
};

export default Home;
