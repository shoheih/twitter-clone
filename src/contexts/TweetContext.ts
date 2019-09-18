import { createContext } from 'react';

interface Tweet {
  tweets: (
    | firebase.firestore.QueryDocumentSnapshot
    | firebase.firestore.DocumentSnapshot)[];
  fetchSingleTweet: (id: string) => Promise<void>;
  isInitialFetching: boolean;
  isMoreFetching: boolean;
  isCompleteRef: React.MutableRefObject<boolean>;
  fetchInitialTweets: () => void;
  fetchMoreTweets: () => void;
  handleScroll: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const TweetContext = createContext<Tweet>({} as Tweet);

export default TweetContext;