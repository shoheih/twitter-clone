import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModalProps } from './modal.types';

const Modal = ({ children, title, hide }: ModalProps) => {
  return (
    <Dialog maxWidth={'xl'} open={true} onClose={hide}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
