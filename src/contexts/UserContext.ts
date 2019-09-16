import { createContext } from 'react';
import { DispUserType } from '../firebase/firebase.types';

const UserContext = createContext<DispUserType>({
  isLoading: true
});

export default UserContext;
