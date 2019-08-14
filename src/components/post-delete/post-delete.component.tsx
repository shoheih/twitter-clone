import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './post-delete.styles';

const PostDelete = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2" component="p" color="secondary">
        ※削除したつぶやきは元に戻せません
      </Typography>
      <Button
        className={classes.button}
        variant="contained"
        disabled={false}
        color="secondary"
      >
        削除する
      </Button>
    </div>
  );
};

export default PostDelete;
