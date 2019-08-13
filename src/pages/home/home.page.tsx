import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import Fab from '../../components/fab/fab.component';
import Tweet from '../../components/tweet/tweet.component';
import useStyles from './home.styles';
import tweetList from '../../components/tweet/tweet.datas';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import useDialog from '../../hooks/useDialog';

const Home = () => {
  const classes = useStyles();
  const { isShowing, toggle } = useDialog();

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
        {tweetList.map(tweet => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Grid>
      <Fab toggle={toggle} />
      <FormDialog isShowing={isShowing} toggle={toggle} />
    </>
  );
};

export default Home;
