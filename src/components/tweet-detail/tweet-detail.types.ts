import { firestore } from 'firebase';

export interface TweetDetailData {
  body: string;
  imgUrl: string | undefined;
  createdAt: firestore.Timestamp;
  authorId: string;
  authorName: string;
  authorThumbnailURL: string;
  editToggle: () => void;
  deleteToggle: () => void;
}
