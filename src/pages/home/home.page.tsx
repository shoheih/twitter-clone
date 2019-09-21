import React from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { useUser } from '../../hooks/user';
import { useTweet } from '../../hooks/tweet';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import useReactRouter from 'use-react-router';
import useStyles from './home.styles';
import Header from '../../components/header/header.component';
import Tweet from '../../components/tweet/tweet.component';
import PostNew from '../../components/post-new/post-new.component';
import Progress from '../../components/progress/progress.component';

const Home = () => {
  const classes = useStyles();
  const user = useUser();
  const {
    tweets,
    isAllDataFetched,
    existLastVisible,
    fetchTweets
  } = useTweet();
  const isFetching = useInfiniteScroll({
    loadMore: fetchTweets,
    initialLoad: !existLastVisible
  });
  const { history, match } = useReactRouter();

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
          {tweets.map(tweet => {
            return (
              <Tweet
                key={tweet.id}
                id={tweet.id}
                body={tweet.body}
                imgUrl={tweet.imgUrl}
                createdAt={tweet.createdAt}
                authorName={tweet.authorName}
                authorThumbnailURL={tweet.authorThumbnailURL}
                click={() => {
                  history.push({
                    pathname: `${match.url}tweet/${tweet.id}`,
                    state: { isFromHome: true }
                  });
                }}
              />
            );
          })}
          <Box className={classes.progress}>
            {isFetching && !isAllDataFetched && <Progress />}
            {isAllDataFetched && (
              <Typography variant="caption">投稿は以上です</Typography>
            )}
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
