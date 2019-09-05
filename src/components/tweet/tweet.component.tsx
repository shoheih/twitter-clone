import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './tweet.styles';
import { TweetData } from './tweet.types';
import { getPostingTimeString } from '../../utils/func';

const Tweet = (props: TweetData) => {
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
          title={`@${authorName}・${getPostingTimeString(createdAt)}`}
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
            <img
              className={classes.media}
              src={imgUrl}
              alt={`${authorName}_photo`}
            />
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Tweet;
