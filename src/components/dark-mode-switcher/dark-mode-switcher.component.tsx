import React, { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Brightness2 from '@material-ui/icons/Brightness2';
import Brightness5 from '@material-ui/icons/Brightness5';
import useStyles from './dark-mode-switcher.styles';

const DarkModeSwitcher = () => {
  const classes = useStyles();
  const theme = useContext(ThemeContext);

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item className={classes.icon}>
          <Brightness5 />
        </Grid>
        <Grid item>
          <Switch checked={theme.isDarkMode} onChange={theme.toggleTheme} />
        </Grid>
        <Grid item className={classes.icon}>
          <Brightness2 />
        </Grid>
      </Grid>
    </Typography>
  );
};

export default DarkModeSwitcher;
