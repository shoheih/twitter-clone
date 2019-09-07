export interface TweetDetailData {
  body: string;
  imgUrl?: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorThumbnailURL: string;
  deleteToggle: () => void;
}
