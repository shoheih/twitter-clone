import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import FloatingActionButton from '../../components/floating-action-button/floating-action-button.component';
import Tweet from '../../components/tweet/tweet.component';
import useStyles from './home.styles';
import tweetList from '../../components/tweet/tweet.datas';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import PostNew from '../../components/post-new/post-new.component';
import useDialog from '../../hooks/useDialog';

const Home = () => {
  const classes = useStyles();
  const { isShowing, toggle } = useDialog();
  const modalOptions = {
    title: '気になることをつぶやいてみよう！',
    content: <PostNew />
  };

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
      <FloatingActionButton toggle={toggle} />
      <FormDialog
        title={modalOptions.title}
        content={modalOptions.content}
        isShowing={isShowing}
        toggle={toggle}
      />
    </>
  );
};

export default Home;
