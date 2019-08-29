import { RouteComponentProps } from 'react-router';
import { firestore } from 'firebase';

export interface TweetData {
  id: string;
  body: string;
  imgUrl: string | undefined;
  createdAt: firestore.Timestamp;
  authorName: string;
  authorThumbnailURL: string;
}

export type TweetTypes = RouteComponentProps & TweetData;
