import React from 'react';
import { Container, Grid, Box, Fab, Typography } from '@material-ui/core';
import { ChatBubble } from '@material-ui/icons';
import { useUser } from '../../hooks/user';
import { useTweet } from '../../hooks/tweet';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import useReactRouter from 'use-react-router';
import useStyles from './home.styles';
import Tweet from '../../components/tweet/tweet.component';
import ToggleContent from '../../components/toggle-content/toggle-content.component';
import Modal from '../../components/modal/modal.component';
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
      <Container maxWidth="sm" className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.grid}
        >
          {user.userInfo && <PostNew />}
          {user.userInfo && (
            <ToggleContent
              toggle={show => (
                <Fab
                  color="secondary"
                  aria-label="add"
                  className={classes.fab}
                  onClick={show}
                >
                  <ChatBubble />
                </Fab>
              )}
              content={hide => (
                <Modal title="" hide={hide}>
                  <PostNew hide={hide} />
                </Modal>
              )}
            />
          )}
          {[...tweets].map(tweet => {
            const value = tweet[1];
            return (
              <Tweet
                key={value.id}
                id={value.id}
                body={value.body}
                imgUrl={value.imgUrl}
                createdAt={value.createdAt}
                authorId={value.authorId}
                authorName={value.authorName}
                authorThumbnailURL={value.authorThumbnailURL}
                click={() => {
                  history.push({
                    pathname: `${match.url}tweet/${value.id}`,
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
