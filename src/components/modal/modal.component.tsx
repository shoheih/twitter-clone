import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { ModalProps } from './modal.types';

const Modal = ({ children, title, hide }: ModalProps) => {
  return (
    <Dialog fullWidth={true} maxWidth={'sm'} open={true} onClose={hide}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
