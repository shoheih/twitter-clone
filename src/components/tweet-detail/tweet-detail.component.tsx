import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
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
import { TweetDetailData } from '../tweet-detail/tweet-detail.types';
import { getPostingTimeStringAll } from '../../utils/func';

const TweetDetail = (props: TweetDetailData) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const {
    body,
    imgUrl,
    createdAt,
    authorId,
    authorName,
    authorThumbnailURL,
    deleteToggle
  } = props;

  const renderEditAndDeleteIcon = () => {
    if (!user) return null;

    if (user.id === authorId) {
      return (
        <IconButton aria-label="delete tweet" onClick={deleteToggle}>
          <DeleteIcon />
        </IconButton>
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
