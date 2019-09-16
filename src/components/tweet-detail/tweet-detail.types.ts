export interface TweetDetailData {
  id: string;
  body: string;
  imgUrl?: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorThumbnailURL: string;
}
