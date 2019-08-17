import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import useStyles from './tweet.styles';
import { TweetTypes } from './tweet.types';

const Tweet = (props: TweetTypes) => {
  const classes = useStyles();
  const {
    history,
    match,
    id,
    body,
    createdAt,
    authorName,
    authorThumbnailURL
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

  return (
    <Card
      onClick={() => history.push(`${match.url}tweet/${id}`)}
      className={classes.card}
    >
      <CardActionArea>
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
          <Typography
            className={classes.time}
            variant="caption"
            color="textSecondary"
            component="time"
          >
            {getDateFormat(createdAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default withRouter(Tweet);
