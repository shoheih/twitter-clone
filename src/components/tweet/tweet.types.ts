export interface TweetData {
  body: string;
  imgUrl?: string;
  createdAt: Date;
  authorName: string;
  authorThumbnailURL: string;
  click: () => void;
}
