import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import useStyles from './detail.styles';
import TweetDetail from '../../components/tweet/tweet-detail.component';
import tweetList from '../../components/tweet/tweet.datas';
import { DetailTypes } from './detail.types';

const Detail = ({ match }: DetailTypes) => {
  const classes = useStyles();
  // 実際はデータベースからツイートデータをfetchします。
  const tweet = tweetList.find(tweet => tweet.id === match.params.id);

  return (
    <>
      <Header />
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className={classes.root}
      >
        {tweet && <TweetDetail {...tweet} />}
      </Grid>
    </>
  );
};

export default withRouter(Detail);
