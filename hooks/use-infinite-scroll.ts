import { useEffect, useRef } from 'react';

// ----------------------------------------------------------------

interface IUseInfiniteScroll {
  postsCount: number;
  hasNextPage: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const useInfiniteScroll = ({
  hasNextPage,
  postsCount,
  setPage,
}: IUseInfiniteScroll) => {
  const lastItemRef = useRef<HTMLLIElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (
        entry.isIntersecting &&
        hasNextPage &&
        postsCount % 10 === 0 &&
        postsCount !== 0
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (observer.current) observer.current.observe(lastItemRef.current!);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasNextPage, postsCount, setPage]);

  return lastItemRef;
};
