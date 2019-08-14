import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import useStyles from './tweet-detail.styles';
import { TweetDetailData } from '../tweet-detail/tweet-detail.types';

const TweetDetail = (props: TweetDetailData) => {
  const classes = useStyles();
  const {
    userAvatar,
    userName,
    imageUrl,
    content,
    time,
    editToggle,
    deleteToggle
  } = props;

  return (
    <Card className={classes.card}>
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
          className={classes.time}
          variant="caption"
          color="textSecondary"
          component="time"
        >
          {time}
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete tweet" onClick={deleteToggle}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit icon" onClick={editToggle}>
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TweetDetail;
