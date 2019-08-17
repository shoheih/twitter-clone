import { firestore } from 'firebase';

export interface TweetDetailData {
  body: string;
  createdAt: firestore.Timestamp;
  authorName: string;
  authorThumbnailURL: string;
  editToggle: () => void;
  deleteToggle: () => void;
}
