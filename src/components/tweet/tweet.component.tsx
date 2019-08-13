import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './tweet.styles';
import { TweetData } from './tweet.types';

const Tweet = (props: TweetData) => {
  const classes = useStyles();
  const { userAvatar, userName, imageUrl, content, time } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar aria-label="tweet" className={classes.avatar}>
              {userAvatar}
            </Avatar>
          }
          title={userName}
        />
        {imageUrl && <CardMedia className={classes.media} image={imageUrl} />}
        <CardContent>
          <Typography
            className={classes.content}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {content}
          </Typography>
          <Typography
            className={classes.time}
            variant="caption"
            color="textSecondary"
            component="time"
          >
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Tweet;
