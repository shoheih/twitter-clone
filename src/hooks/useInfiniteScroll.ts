import { useState, useRef, useCallback } from 'react';
import { firestore } from '../firebase/firebase.utils';

const useInfiniteScroll = () => {
  const LIMIT = 10;
  const [tweets, setTweets] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [isMoreFetching, setIsMoreFetching] = useState(false);
  const isInitialFetchingCompletedRef = useRef<boolean>(false);
  const isCompleteRef = useRef<boolean>(false);
  const lastVisibleRef = useRef<firebase.firestore.QueryDocumentSnapshot | null>(
    null
  );

  const fetchInitialTweets = useCallback(() => {
    const func = async () => {
      if (isInitialFetchingCompletedRef.current) return;
      const postsQuerySnapShot = await firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT + 1)
        .get();
      if (postsQuerySnapShot.docs.length < LIMIT + 1) {
        isCompleteRef.current = true;
        lastVisibleRef.current =
          postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1];
        setTweets(postsQuerySnapShot.docs);
      } else {
        lastVisibleRef.current =
          postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 2];
        setTweets(postsQuerySnapShot.docs.slice(0, LIMIT));
      }
      setIsInitialFetching(false);
      isInitialFetchingCompletedRef.current = true;
    };
    func();
  }, []);

  const fetchMoreTweets = useCallback(() => {
    const func = async () => {
      const postsQuerySnapShot = await firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .startAfter(lastVisibleRef.current)
        .limit(LIMIT + 1)
        .get();
      if (postsQuerySnapShot.docs.length < LIMIT + 1) {
        isCompleteRef.current = true;
        lastVisibleRef.current =
          postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 1];
        setTweets(acc => [...acc, ...postsQuerySnapShot.docs]);
      } else {
        lastVisibleRef.current =
          postsQuerySnapShot.docs[postsQuerySnapShot.docs.length - 2];
        setTweets(acc => [...acc, ...postsQuerySnapShot.docs.slice(0, LIMIT)]);
      }
      setIsMoreFetching(false);
    };
    func();
  }, []);

  const handleScroll = useCallback(() => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const isScrollBottom =
      window.innerHeight + top - document.documentElement.offsetHeight >= -200
        ? true
        : false;
    if (!isScrollBottom) return;
    setIsMoreFetching(true);
  }, []);

  return {
    tweets,
    isInitialFetching,
    isMoreFetching,
    isCompleteRef,
    fetchInitialTweets,
    fetchMoreTweets,
    handleScroll
  };
};

export default useInfiniteScroll;
