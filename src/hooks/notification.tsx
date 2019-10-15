import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef
} from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

interface Props {
  showNotification: (message: string) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const Ctx = createContext<Props>({} as Props);

interface ProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: ProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // messageの変更は再レンダーのトリガーではないので、
  // useStateではなくuseRefを使用中
  const messageRef = useRef<string>('');
  const snackbarOrigin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'center'
  };

  const showNotification = useCallback(async (message: string) => {
    messageRef.current = message;
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, []);

  return (
    <Ctx.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={isVisible}
        message={messageRef.current}
        anchorOrigin={snackbarOrigin}
      />
    </Ctx.Provider>
  );
};

export const useNotification = () => useContext(Ctx);
