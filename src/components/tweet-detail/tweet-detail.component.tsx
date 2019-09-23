import React from 'react';
import { useUser } from '../../hooks/user';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import useStyles from './tweet-detail.styles';
import ToggleContent from '../../components/toggle-content/toggle-content.component';
import Modal from '../../components/modal/modal.component';
import PostDelete from '../../components/post-delete/post-delete.component';
import { TweetDetailData } from '../tweet-detail/tweet-detail.types';
import { getPostingTimeStringAll } from '../../utils/func';

const TweetDetail = (props: TweetDetailData) => {
  const classes = useStyles();
  const user = useUser();
  const {
    id,
    body,
    imgUrl,
    createdAt,
    authorId,
    authorName,
    authorThumbnailURL
  } = props;

  const renderEditAndDeleteIcon = () => {
    if (!user.userInfo) return null;

    if (user.userInfo.id === authorId) {
      return (
        <ToggleContent
          toggle={show => (
            <IconButton onClick={show}>
              <DeleteIcon />
            </IconButton>
          )}
          content={hide => (
            <Modal title="つぶやきを削除しますか？" hide={hide}>
              <PostDelete id={id} imgUrl={imgUrl} hide={hide} />
            </Modal>
          )}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="tweet"
            className={classes.avatar}
            src={`${authorThumbnailURL}`}
          />
        }
        title={authorName}
      />
      <CardContent>
        <Typography
          className={classes.content}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {body}
        </Typography>
        {imgUrl ? (
          <CardMedia
            className={classes.media}
            image={imgUrl}
            title={`${authorName}_photo`}
          />
        ) : null}
      </CardContent>
      <CardActions className={classes.action}>
        <Typography variant="caption" color="textSecondary" component="time">
          {getPostingTimeStringAll(createdAt)}
        </Typography>
        {renderEditAndDeleteIcon()}
      </CardActions>
    </Card>
  );
};

export default TweetDetail;
