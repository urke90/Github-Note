import { useEffect, useState } from 'react';

import { getAllPosts } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/post';

// ----------------------------------------------------------------

interface IUseFetchPosts {
  initialPosts: IPost[];
  initHasNextPage: boolean;
  currentPage: number;
}

export const useFetchPosts = ({
  initialPosts,
  initHasNextPage,
  currentPage,
}: IUseFetchPosts) => {
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [postsData, setPostsData] = useState({
    posts: initialPosts,
    hasNextPage: initHasNextPage,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await getAllPosts({ page, itemsPerPage: 10 });
      if (response?.ok && response.status === 200) {
        setPostsData((prevDate) => ({
          hasNextPage: response.hasNextPage,
          posts: [...prevDate.posts, ...response.posts],
        }));
      }
      setIsLoading(false);
    };

    if (page !== 1) fetchPosts();
  }, [page]);

  return {
    posts: postsData.posts,
    hasNextPage: postsData.hasNextPage,
    setPage,
    isLoading,
  };
};
