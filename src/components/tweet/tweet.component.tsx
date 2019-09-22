import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  Avatar,
  Typography
} from '@material-ui/core';
import useStyles from './tweet.styles';
import { TweetObject } from './tweet.types';
import { getPostingTimeString } from '../../utils/func';

const Tweet = (props: TweetObject) => {
  const classes = useStyles();
  const {
    body,
    imgUrl,
    createdAt,
    authorName,
    authorThumbnailURL,
    click
  } = props;

  return (
    <Card onClick={click} className={classes.card}>
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
          subheader={getPostingTimeString(createdAt)}
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
      </CardActionArea>
    </Card>
  );
};

export default Tweet;
