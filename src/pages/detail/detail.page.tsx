import React, { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { firestore } from '../../firebase/firebase.utils';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';
import useStyles from './detail.styles';
import { DetailTypes } from './detail.types';
import Progress from '../../components/progress/progress.component';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const Detail = ({ match }: DetailTypes) => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const [tweet, setTweet] = useState<
    firebase.firestore.DocumentData | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTweet = async () => {
      setIsLoading(true);
      const postsRef = firestore.collection('posts').doc(match.params.id);
      const postSnapShot = await postsRef.get();
      setTweet(postSnapShot.data());
      setIsLoading(false);
    };
    fetchTweet();
  }, [match.params.id]);

  return (
    <>
      <Header />
      <Container maxWidth="sm" className={classes.root}>
        <IconButton
          onClick={() => {
            if (history.location.state && history.location.state.isFromHome) {
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
          {isLoading ? (
            <Progress />
          ) : (
            tweet && (
              <TweetDetail
                id={match.params.id}
                body={tweet.body}
                imgUrl={tweet.imgUrl}
                createdAt={tweet.createdAt.toDate()}
                authorId={tweet.author.id}
                authorName={tweet.author.displayName}
                authorThumbnailURL={tweet.author.photoURL}
              />
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default withRouter(Detail);
