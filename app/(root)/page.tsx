import Image from 'next/image';

import { auth } from '@/auth';
import PostItem from '@/components/post/PostItem';
import PostItemBadge from '@/components/post/PostItemBadge';
import Pagination from '@/components/shared/Pagination';
import { POST_TYPES } from '@/constants/post';
import { getAllPosts } from '@/lib/actions/post-actions';
import { IPostsResponse } from '@/types/Post';
import { EQueryPostType } from '@/types/post-types';
import { parseSearchParams } from '@/utils/query';

// ----------------------------------------------------------------

/**
 * pogledati tiny mce custom plugin za Warning code message
 * react calendar heatmap ===> pratimo broj commitova pushova na / HOME
 */

// https://www.youtube.com/watch?v=49mkK-jr5no

interface IHomeProps {
  searchParams: {
    page: string | string[] | undefined;
    postType: string | string[] | undefined;
    tags: string | string[] | undefined;
  };
}

const Home: React.FC<IHomeProps> = async ({ searchParams }) => {
  const page = parseSearchParams(searchParams.page, '1');
  const postType = parseSearchParams(
    searchParams.postType,
    ''
  ) as EQueryPostType;
  const tags = parseSearchParams(searchParams.tags, '');

  const session = await auth();

  if (!session) return null;

  const response: IPostsResponse | undefined = await getAllPosts({
    page,
    postType,
    tags,
  });
  if (!response?.ok && response?.status !== 200) return;

  const { posts, totalPages, hasNextPage, hasPrevPage } = response;

  return (
    <section className="px-[30px]">
      <h1 className="h1-bold mb-2.5 mt-10">Hello {session.user.name},</h1>
      <p className="p1-regular mb-6.5">
        Time to jot down your latest learnings today!
      </p>
      <div className="mx-auto mb-9 max-w-[800]">
        <Image
          src="/assets/images/github-progress.svg"
          alt="Github progress"
          width={800}
          height={165}
        />
      </div>
      <div className="flex-between mb-5 gap-4">
        <h2 className="h2-bold">Recent Posts</h2>
        <div className="flex flex-wrap gap-3.5">
          {POST_TYPES.map(({ value }) => (
            <PostItemBadge key={value} postType={value} />
          ))}
        </div>
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
