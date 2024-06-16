import type { HeatMapValue } from '@uiw/react-heat-map';

import { auth } from '@/auth';
import PostItem from '@/components/post/PostItem';
import PostItemBadge from '@/components/post/PostItemBadge';
import Pagination from '@/components/shared/Pagination';
import PostsHeatMap from '@/components/shared/PostsHeatMap';
import { POST_TYPES } from '@/constants';
import { getAllPosts, getHeatMapPostsData } from '@/lib/actions/post-actions';
import type { IPostsResponse } from '@/types/post';
import { EQueryPostType } from '@/types/post-types';
import { parseSearchParams, parseTagsParams } from '@/utils/params';

// ----------------------------------------------------------------

/**
 * pogledati tiny mce custom plugin za Warning code message
 * react calendar heatmap ===> pratimo broj commitova pushova na / HOME
 */

interface IHomeProps {
  searchParams: {
    page: string | string[] | undefined;
    postType: string | string[] | undefined;
    tag: string | string[] | undefined;
  };
}

const Home: React.FC<IHomeProps> = async ({ searchParams }) => {
  const page = parseSearchParams(searchParams.page, '1');
  const postType = parseSearchParams(
    searchParams.postType,
    ''
  ) as EQueryPostType;
  const tags = parseTagsParams(searchParams.tag);

  const session = await auth();

  if (!session) throw new Error('User data is not available!');

  const response: IPostsResponse | undefined = await getAllPosts({
    page: Number(page),
    postType,
    tags,
    itemsPerPage: 3,
  });
  if (!response?.ok && response?.status !== 200)
    throw new Error('Posts not available at the moment!');

  const heatMapPosts: HeatMapValue[] = await getHeatMapPostsData();

  const { posts, totalPages, hasNextPage, hasPrevPage } = response;

  return (
    <section className="px-5 lg:px-[30px]">
      <h1 className="h1-bold mb-2.5 mt-10">Hello {session.user.name},</h1>
      <p className="p1-regular mb-[30px]">
        Time to jot down your latest learnings today!
      </p>
      <div className="mx-auto mb-9 max-w-[800]">
        <PostsHeatMap value={heatMapPosts} />
      </div>
      <div className="flex-between mb-5 gap-4">
        <h2 className="h2-bold">Recent Posts</h2>
        <ul className="flex flex-wrap gap-3.5">
          {POST_TYPES.map(({ value }) => (
            <PostItemBadge key={value} postType={value} />
          ))}
        </ul>
      </div>
      <ul className="mb-10 flex flex-col gap-5">
        {posts.length > 0 ? (
          posts.map(({ _id, title, tags, type }) => (
            <PostItem
              key={_id}
              title={title}
              type={type}
              id={_id}
              tags={tags}
            />
          ))
        ) : (
          <h2 className="h2-bold text-center">
            There are no posts to display!
          </h2>
        )}
      </ul>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      )}
    </section>
  );
};

export default Home;
