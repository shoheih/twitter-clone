import { firestore } from 'firebase';

export interface TweetDetailData {
  body: string;
  createdAt: firestore.Timestamp;
  authorId: string;
  authorName: string;
  authorThumbnailURL: string;
  editToggle: () => void;
  deleteToggle: () => void;
}
