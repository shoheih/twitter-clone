import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/header/header.component';
import TweetDetail from '../../components/tweet-detail/tweet-detail.component';
import useStyles from './detail.styles';
import tweetList from '../../components/tweet/tweet.datas';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import PostEdit from '../../components/post-edit/post-edit.component';
import PostDelete from '../../components/post-delete/post-delete.component';
import useDialog from '../../hooks/useDialog';
import { DetailTypes } from './detail.types';

const Detail = ({ match }: DetailTypes) => {
  const classes = useStyles();
  const { isShowing: isEditShowing, toggle: editToggle } = useDialog();
  const { isShowing: isDeleteShowing, toggle: deleteToggle } = useDialog();
  const modalOptions = {
    edit: {
      title: 'つぶやきを編集しよう！',
      content: <PostEdit />
    },
    delete: {
      title: 'つぶやきを削除しますか？',
      content: <PostDelete />
    }
  };
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
        {tweet && (
          <TweetDetail
            {...tweet}
            editToggle={editToggle}
            deleteToggle={deleteToggle}
          />
        )}
      </Grid>
      <FormDialog
        title={modalOptions.edit.title}
        content={modalOptions.edit.content}
        isShowing={isEditShowing}
        toggle={editToggle}
      />
      <FormDialog
        title={modalOptions.delete.title}
        content={modalOptions.delete.content}
        isShowing={isDeleteShowing}
        toggle={deleteToggle}
      />
    </>
  );
};

export default withRouter(Detail);
