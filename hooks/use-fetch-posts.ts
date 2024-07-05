import { useEffect, useState } from 'react';

import { getAllPosts } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/post';
import { EQueryPostType } from '@/types/post-types';

// ----------------------------------------------------------------

interface IUseFetchPosts {
  initialPosts: IPost[];
  initHasNextPage: boolean;
  currentPage: number;
  postType: EQueryPostType;
}

export const useFetchPosts = ({
  initialPosts,
  initHasNextPage,
  currentPage,
  postType,
}: IUseFetchPosts) => {
  const [page, setPage] = useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [postsData, setPostsData] = useState({
    posts: initialPosts,
    hasNextPage: initHasNextPage,
  });

  useEffect(() => {
    setPostsData({
      posts: initialPosts,
      hasNextPage: initHasNextPage,
    });
  }, [initialPosts, initHasNextPage]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await getAllPosts({ page, itemsPerPage: 10, postType });
      if (response?.ok && response.status === 200) {
        setPostsData((prevDate) => ({
          hasNextPage: response.hasNextPage,
          posts: [...prevDate.posts, ...response.posts],
        }));
      }
      setIsLoading(false);
    };

    if (page !== 1) fetchPosts();
  }, [page, postType]);

  return {
    posts: postsData.posts,
    hasNextPage: postsData.hasNextPage,
    setPage,
    isLoading,
  };
};
