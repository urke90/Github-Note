'use client';

import PostItem from './PostItem';

import LoadingSpinner from '../shared/LoadingSpinner';

import { useFetchPosts } from '@/hooks/use-fetch-posts';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import type { IPost } from '@/types/post';

// ----------------------------------------------------------------

interface IExplorePostsListProps {
  initialPosts: IPost[];
  currentPage: number;
  initHasNextPage: boolean;
}

const ExplorePostsList: React.FC<IExplorePostsListProps> = ({
  initialPosts,
  currentPage,
  initHasNextPage,
}) => {
  const { hasNextPage, isLoading, posts, setPage } = useFetchPosts({
    initialPosts,
    currentPage,
    initHasNextPage,
  });
  const lastItemRef = useInfiniteScroll({
    hasNextPage,
    postsCount: posts.length,
    setPage,
  });

  return (
    <>
      <ul className="grid grid-cols-2 gap-[18px]">
        {posts.map(({ _id, title, tags, type }) => (
          <PostItem key={_id} id={_id} title={title} tags={tags} type={type} />
        ))}
        <li ref={lastItemRef} />
      </ul>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default ExplorePostsList;
