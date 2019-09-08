import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormDialogData } from './form-dialog.types';

const FormDialog = ({ title, content, isShowing, toggle }: FormDialogData) => {
  return (
    <Dialog
      open={isShowing}
      onClose={toggle}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default FormDialog;
