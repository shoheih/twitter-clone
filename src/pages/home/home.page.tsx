import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import Fab from '../../components/fab/fab.component';
import Tweet from '../../components/tweet/tweet.component';
import useStyles from './home.styles';

const Home: React.FC = () => {
  const classes = useStyles();

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
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </Grid>
      <Fab />
    </>
  );
};

export default Home;
