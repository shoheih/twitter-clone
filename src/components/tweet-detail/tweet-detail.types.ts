export interface TweetDetailData {
  id: string;
  userAvatar: string;
  userName: string;
  imageUrl?: string;
  content: string;
  time: string;
  editToggle: () => void;
  deleteToggle: () => void;
}
