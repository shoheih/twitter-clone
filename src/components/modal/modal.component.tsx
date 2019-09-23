import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
  useMediaQuery
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { ModalProps } from './modal.types';
import useStyles from './modal.styles';

const Modal = ({ children, title, hide }: ModalProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchMediaQuery = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      fullScreen={matchMediaQuery}
      fullWidth={true}
      maxWidth={'sm'}
      open={true}
      onClose={hide}
    >
      {matchMediaQuery && (
        <IconButton
          className={classes.button}
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={hide}
        >
          <CloseOutlined />
        </IconButton>
      )}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
