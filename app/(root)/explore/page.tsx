// ----------------------------------------------------------------

import ExplorePostsList from '@/components/post/ExplorePostsList';
import PostItemBadge from '@/components/post/PostItemBadge';
import { POST_TYPES } from '@/constants';
import { getAllPosts } from '@/lib/actions/post-actions';
import { IPostsResponse } from '@/types/post';
import { parseSearchParams } from '@/utils/params';

// ----------------------------------------------------------------

interface IExplorePageProps {
  searchParams: {
    page: string | string[] | undefined;
    postType: string | string[] | undefined;
  };
}

const ExplorePage: React.FC<IExplorePageProps> = async ({ searchParams }) => {
  const page = Number(parseSearchParams(searchParams.page, '1'));

  const response: IPostsResponse | undefined = await getAllPosts({
    page: Number(page),
    itemsPerPage: 10,
  });

  if (response?.status !== 200) {
    return (
      <h2 className="h2-bold px-[30px] py-10 text-center">
        Something went wrong, couldn&apos;t show posts!
      </h2>
    );
  }

  return (
    <section className="px-[30px] py-10">
      <div className="flex-between mb-6">
        <h2 className="h2-bold">Recent Posts</h2>
        <ul className="flex flex-wrap gap-3.5">
          {POST_TYPES.map(({ value }) => (
            <PostItemBadge key={value} postType={value} />
          ))}
        </ul>
      </div>
      <ExplorePostsList
        initialPosts={response.posts}
        currentPage={page}
        initHasNextPage={response.hasNextPage}
      />
    </section>
  );
};

export default ExplorePage;
