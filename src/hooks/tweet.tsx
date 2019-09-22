import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useContext
} from 'react';
import { firestore } from '../firebase/firebase.utils';

export interface TweetData {
  id: string;
  body: string;
  imgUrl?: string;
  createdAt: Date;
  authorId: string;
  authorName: string;
  authorThumbnailURL: string;
}

export type TweetDataMap = Map<string, TweetData>;

interface Props {
  tweets: TweetDataMap;
  isAllDataFetched: boolean;
  existLastVisible: boolean;
  fetchTweets: () => Promise<void>;
}

interface ProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const Ctx = createContext<Props>({} as Props);

const TweetProvider = ({ children }: ProviderProps) => {
  const FETCH_LIMIT_NUM = 10;
  const [tweets, setTweets] = useState<TweetDataMap>(new Map());
  const isAllDataFetchedRef = useRef<boolean>(false);
  const lastVisibleRef = useRef<firebase.firestore.QueryDocumentSnapshot | null>(
    null
  );

  const getTweetDataObject = (
    QueryDocumentSnapshot: firebase.firestore.QueryDocumentSnapshot[]
  ): TweetDataMap => {
    return new Map(
      QueryDocumentSnapshot.map(tweet => {
        const data = tweet.data();
        const object: TweetData = {
          id: tweet.id,
          body: data.body,
          imgUrl: data.imgUrl,
          createdAt: data.createdAt.toDate(),
          authorId: data.author.id,
          authorName: data.author.displayName,
          authorThumbnailURL: data.author.photoURL
        };
        return [tweet.id, object];
      })
    );
  };

  const fetchTweets = useCallback(async () => {
    if (isAllDataFetchedRef.current) return;

    const orderByQuery = firestore
      .collection('posts')
      .orderBy('createdAt', 'desc');

    const postsQuerySnapShot = lastVisibleRef.current
      ? await orderByQuery
          .startAfter(lastVisibleRef.current)
          .limit(FETCH_LIMIT_NUM + 1)
          .get()
      : await orderByQuery.limit(FETCH_LIMIT_NUM + 1).get();

    const isFetchedAllData =
      postsQuerySnapShot.docs.length < FETCH_LIMIT_NUM + 1;

    if (isFetchedAllData) {
      isAllDataFetchedRef.current = true;
      lastVisibleRef.current =
        postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1];
      setTweets(
        acc => new Map([...acc, ...getTweetDataObject(postsQuerySnapShot.docs)])
      );
    } else {
      lastVisibleRef.current =
        postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 2];
      setTweets(
        acc =>
          new Map([
            ...acc,
            ...getTweetDataObject(
              postsQuerySnapShot.docs.slice(0, FETCH_LIMIT_NUM)
            )
          ])
      );
    }
  }, []);

  return (
    <Ctx.Provider
      value={{
        tweets,
        isAllDataFetched: isAllDataFetchedRef.current,
        existLastVisible: lastVisibleRef.current ? true : false,
        fetchTweets
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

const useTweet = () => useContext(Ctx);

export { TweetProvider, useTweet };
