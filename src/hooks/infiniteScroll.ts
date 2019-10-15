import { useState, useEffect } from 'react';

interface Props {
  loadMore: () => Promise<void>;
  initialLoad: boolean;
}

const useInfiniteScroll = ({ loadMore, initialLoad }: Props) => {
  const [isFetching, setIsFetching] = useState<boolean>(initialLoad);

  const handleScroll = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    const isScrollBottom =
      window.innerHeight + top - document.documentElement.offsetHeight >= -200
        ? true
        : false;
    if (isScrollBottom) setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isFetching) return;
      await loadMore();
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching, loadMore]);

  return isFetching;
};

export default useInfiniteScroll;
