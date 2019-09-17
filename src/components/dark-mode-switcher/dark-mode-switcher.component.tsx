import React from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Brightness2 from '@material-ui/icons/Brightness2';
import Brightness5 from '@material-ui/icons/Brightness5';
import useStyles from './dark-mode-switcher.styles';
import { useDarkMode } from '../../hooks/darkMode';
import { useNotification } from '../../hooks/notification';

const DarkModeSwitcher = () => {
  const classes = useStyles();
  const { showNotification } = useNotification();
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item className={classes.icon}>
          <Brightness5 />
        </Grid>
        <Grid item>
          <Switch
            checked={isDarkMode}
            onChange={() => {
              if (!isDarkMode) {
                showNotification('ダークモードに切り替わりました');
              } else {
                showNotification('ダークモードを解除しました');
              }
              toggleTheme();
            }}
          />
        </Grid>
        <Grid item className={classes.icon}>
          <Brightness2 />
        </Grid>
      </Grid>
    </Typography>
  );
};

export default DarkModeSwitcher;
