import { createContext } from 'react';
import { User } from 'firebase';

const AppContext = createContext<User | null>(null);

export default AppContext;
