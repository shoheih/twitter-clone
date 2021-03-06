import * as firebase from 'firebase/app';
import 'firebase/firestore';

export type UserType = firebase.firestore.DocumentData | undefined;

export interface DispUserType {
  userInfo?: firebase.firestore.DocumentData;
  isLoading: boolean;
}
