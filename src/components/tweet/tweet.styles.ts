import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '60%',
      marginTop: '10px',
      marginBottom: '10px'
    },
    media: {
      height: 0,
      paddingTop: '56.25%'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main
    },
    content: {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word'
    },
    time: {
      display: 'block',
      marginTop: theme.spacing(2),
      textAlign: 'right'
    }
  })
);

export default useStyles;
