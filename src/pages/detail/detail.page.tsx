import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useTweet, TweetData } from '../../hooks/tweet';
import { withRouter } from 'react-router-dom';
import { DetailTypes } from './detail.types';
import useStyles from './detail.styles';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';
import Progress from '../../components/progress/progress.component';

const Detail = ({ history, match }: DetailTypes) => {
  const classes = useStyles();
  const idRef = useRef<string>(match.params.id);
  const { tweets, fetchTweet } = useTweet();
  const [tweet, setTweet] = useState<TweetData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFromHome =
    history.location.state && history.location.state.isFromHome;

  useEffect(() => {
    setIsLoading(true);
    fetchTweet(idRef.current).then(() => {
      setIsLoading(false);
    });
  }, [fetchTweet]);

  useEffect(() => {
    setTweet(tweets.get(idRef.current));
  }, [tweets]);

  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <IconButton
          onClick={() => {
            if (isFromHome) {
              history.goBack();
            } else {
              history.push('/');
            }
          }}
          aria-label="back"
        >
          <ArrowBack />
        </IconButton>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="row"
          className={classes.grid}
        >
          {isLoading && <Progress />}
          {tweet && (
            <TweetDetail
              id={match.params.id}
              body={tweet.body}
              imgUrl={tweet.imgUrl}
              createdAt={tweet.createdAt}
              authorId={tweet.authorId}
              authorName={tweet.authorName}
              authorThumbnailURL={tweet.authorThumbnailURL}
            />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default withRouter(Detail);
