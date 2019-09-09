import { createContext } from 'react';
import { UserType } from '../firebase/firebase.types';

const UserContext = createContext<UserType>(undefined);

export default UserContext;
