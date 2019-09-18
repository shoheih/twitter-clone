import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { DispUserType } from '../firebase/firebase.types';
import { useNotification } from './notification';

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const Ctx = createContext<DispUserType>({} as DispUserType);

interface ProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<DispUserType>({
    isLoading: true
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async userAuth => {
      setUser({ isLoading: true });
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        if (userRef) {
          userRef.onSnapshot(snapShot => {
            setUser({
              userInfo: { ...snapShot.data(), id: snapShot.id },
              isLoading: false
            });
          });
        }
        showNotification('ログインしました！');
      } else {
        setUser({ isLoading: false });
        showNotification('ログアウト状態です');
      }
    });
    return unregisterAuthObserver;
  }, [showNotification]);

  return <Ctx.Provider value={user}>{children}</Ctx.Provider>;
};

export const useUser = () => useContext(Ctx);
