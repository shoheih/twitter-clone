import { createContext } from 'react';
import { UserType } from '../firebase/firebase.types';

const AppContext = createContext<UserType>(undefined);

export default AppContext;
