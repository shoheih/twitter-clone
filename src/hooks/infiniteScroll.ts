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
    const getData = async (load: boolean) => {
      if (!load) return;
      await loadMore();
    };
    const fetchData = async () => {
      await getData(isFetching);
      setIsFetching(false);
    };
    fetchData();
  }, [isFetching, loadMore]);

  return isFetching;
};

export default useInfiniteScroll;
