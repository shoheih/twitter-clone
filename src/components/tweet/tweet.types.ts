import { RouteComponentProps } from 'react-router';

export interface TweetData {
  id: string;
  userAvatar: string;
  userName: string;
  imageUrl?: string;
  content: string;
  time: string;
}

export type TweetTypes = RouteComponentProps & TweetData;
