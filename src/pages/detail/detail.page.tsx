import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, IconButton, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useTweet } from '../../hooks/tweet';
import { withRouter } from 'react-router-dom';
import { DetailTypes } from './detail.types';
import useStyles from './detail.styles';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';
import Progress from '../../components/progress/progress.component';

const Detail = ({ history, match }: DetailTypes) => {
  const classes = useStyles();
  const idRef = useRef<string>(match.params.id);
  const { tweets, fetchTweet } = useTweet();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isFromHome =
    history.location.state && history.location.state.isFromHome;

  useEffect(() => {
    setIsLoading(true);
    fetchTweet(idRef.current).then(() => {
      setIsLoading(false);
    });
  }, [fetchTweet]);

  const renderTweet = (isLoading: boolean) => {
    if (isLoading) return <Progress />;

    const tweet = tweets.get(idRef.current);
    if (!tweet)
      return (
        <Typography variant="body2" component="p">
          つぶやきは存在しません。
          <br />
          既に削除された可能性があります。
        </Typography>
      );

    return (
      <TweetDetail
        id={match.params.id}
        body={tweet.body}
        imgUrl={tweet.imgUrl}
        createdAt={tweet.createdAt}
        authorId={tweet.authorId}
        authorName={tweet.authorName}
        authorThumbnailURL={tweet.authorThumbnailURL}
      />
    );
  };

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
          {renderTweet(isLoading)}
        </Grid>
      </Container>
    </>
  );
};

export default withRouter(Detail);
