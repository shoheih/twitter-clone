import React, {
  createContext,
  useState,
  useRef,
  useCallback,
  useContext
} from 'react';
import { firestore, storage } from '../firebase/firebase.utils';
import { UserType } from '../firebase/firebase.types';

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

interface ContextProps {
  tweets: TweetDataMap;
  isAllDataFetched: boolean;
  existLastVisible: boolean;
  fetchTweets: () => Promise<void>;
  createTweet: (tweet: CreateTweetProps) => Promise<void>;
  deleteTweet: (id: string, imgUrl?: string | undefined) => Promise<void>;
}

interface ProviderProps {
  children: React.ReactNode;
}

interface ImageObject {
  name: string;
  data: string;
}

export interface CreateTweetProps {
  body: string;
  author: UserType;
  createdAt: Date;
  image?: ImageObject;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const Ctx = createContext<ContextProps>({} as ContextProps);

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

  const fetchTweet = async (id: string) => {
    const documentSnapShot = await firestore
      .collection('posts')
      .doc(id)
      .get();

    const data = documentSnapShot.data();
    if (data) {
      const object: TweetData = {
        id: documentSnapShot.id,
        body: data.body,
        imgUrl: data.imgUrl,
        createdAt: data.createdAt.toDate(),
        authorId: data.author.id,
        authorName: data.author.displayName,
        authorThumbnailURL: data.author.photoURL
      };
      setTweets(acc => new Map([[documentSnapShot.id, object], ...acc]));
    }
  };

  const submitImage = async (imgName: string, imgData: string) => {
    const storageRef = storage.ref('users');
    const imgRef = storageRef.child(imgName);
    await imgRef.putString(imgData, 'data_url');
    return storageRef.child(imgName).getDownloadURL();
  };

  const createTweet = async (tweet: CreateTweetProps) => {
    const postRef = firestore.collection('posts');
    const batch = firestore.batch();
    const id = postRef.doc().id;
    const { body, author, createdAt } = tweet;
    if (tweet.image) {
      const { name, data } = tweet.image;
      const url = await submitImage(name, data);
      batch.set(postRef.doc(id), {
        body,
        author,
        createdAt,
        imgUrl: url
      });
      await batch.commit();
      return fetchTweet(id);
    } else {
      batch.set(postRef.doc(id), {
        body,
        author,
        createdAt
      });
      await batch.commit();
      return fetchTweet(id);
    }
  };

  const deleteImage = (imgUrl: string) => {
    const storageRef = storage.refFromURL(imgUrl);
    return storageRef.delete();
  };

  const deleteTweet = async (id: string, imgUrl?: string) => {
    if (imgUrl) {
      await deleteImage(imgUrl);
    }
    await firestore
      .collection('posts')
      .doc(id)
      .delete();

    setTweets(acc => {
      const map = acc;
      map.delete(id);
      return map;
    });
  };

  return (
    <Ctx.Provider
      value={{
        tweets,
        isAllDataFetched: isAllDataFetchedRef.current,
        existLastVisible: lastVisibleRef.current ? true : false,
        fetchTweets,
        createTweet,
        deleteTweet
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

const useTweet = () => useContext(Ctx);

export { TweetProvider, useTweet };
