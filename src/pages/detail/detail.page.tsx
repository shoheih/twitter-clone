import React, { useState, useEffect } from 'react';
import { Container, Grid, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useTweet, TweetData } from '../../hooks/tweet';
import { withRouter } from 'react-router-dom';
import { DetailTypes } from './detail.types';
import useStyles from './detail.styles';
import Header from '../../components/header/header.component';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';

const Detail = ({ history, match }: DetailTypes) => {
  const classes = useStyles();
  const { tweets, fetchTweetDirectly } = useTweet();
  const [tweet, setTweet] = useState<TweetData | undefined>(undefined);
  const isFromHome =
    history.location.state && history.location.state.isFromHome;

  useEffect(() => {
    if (isFromHome) {
      setTweet(tweets.get(match.params.id));
    } else {
      fetchTweetDirectly(match.params.id).then(tweet => {
        setTweet(tweet);
      });
    }
  }, [match, fetchTweetDirectly, isFromHome, tweets]);

  return (
    <>
      <Header />
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
