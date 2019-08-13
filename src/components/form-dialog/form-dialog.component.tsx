import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormDialogData } from './form-dialog.types';

const FormDialog = ({ isShowing, toggle }: FormDialogData) => {
  return (
    <Dialog
      open={isShowing}
      onClose={toggle}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        気になることを呟いてみよう！
      </DialogTitle>
    </Dialog>
  );
};

export default FormDialog;
