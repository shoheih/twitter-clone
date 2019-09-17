import React, { createContext, useState, useContext } from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

interface Props {
  show: (message: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const Ctx = createContext<Props>({} as Props);

interface ProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: ProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const snackbarOrigin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'center'
  };

  const show = (message: string) => {
    setMessage(message);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      <Snackbar
        open={isVisible}
        message={message}
        anchorOrigin={snackbarOrigin}
      />
    </Ctx.Provider>
  );
};

export const useNotification = () => useContext(Ctx);
