import React from 'react';
import {
  Switch,
  Grid,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { Brightness2, Brightness5 } from '@material-ui/icons';
import useStyles from './dark-mode-switcher.styles';
import { useDarkMode } from '../../hooks/darkMode';

const DarkModeSwitcher = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchMediaQuery = useMediaQuery(theme.breakpoints.down('xs'));
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <>
      {matchMediaQuery ? (
        <IconButton className={classes.iconButton} onClick={toggleTheme}>
          {isDarkMode ? <Brightness2 /> : <Brightness5 />}
        </IconButton>
      ) : (
        <Typography component="div" className={classes.root}>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item className={classes.icon}>
              <Brightness5 />
            </Grid>
            <Grid item>
              <Switch checked={isDarkMode} onChange={toggleTheme} />
            </Grid>
            <Grid item className={classes.icon}>
              <Brightness2 />
            </Grid>
          </Grid>
        </Typography>
      )}
    </>
  );
};

export default DarkModeSwitcher;
