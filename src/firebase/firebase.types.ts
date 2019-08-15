// import { User } from 'firebase';

// export type UserType = User | null;

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export type UserType = firebase.firestore.DocumentData | undefined;
