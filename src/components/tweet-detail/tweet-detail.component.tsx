import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import useStyles from './tweet-detail.styles';
import { TweetDetailData } from '../tweet-detail/tweet-detail.types';

const TweetDetail = (props: TweetDetailData) => {
  const classes = useStyles();
  const user = useContext(AppContext);
  const {
    body,
    imgUrl,
    createdAt,
    authorId,
    authorName,
    authorThumbnailURL,
    deleteToggle
  } = props;

  const getDateFormat = (createdAt: firebase.firestore.Timestamp) => {
    const date = createdAt.toDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${year}/${month}/${day} ${hour}:${minutes}`;
  };

  const renderEditAndDeleteIcon = () => {
    if (!user) return null;

    if (user.id === authorId) {
      return (
        <>
          <CardActions>
            <IconButton aria-label="delete tweet" onClick={deleteToggle}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </>
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
          className={classes.time}
          variant="caption"
          color="textSecondary"
          component="time"
        >
          {getDateFormat(createdAt)}
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {body}
        </Typography>
        {imgUrl ? (
          <img
            className={classes.media}
            src={imgUrl}
            alt={`${authorName}_photo`}
          />
        ) : null}
      </CardContent>
      {renderEditAndDeleteIcon()}
    </Card>
  );
};

export default TweetDetail;
