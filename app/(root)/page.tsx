import { auth } from '@/auth';
import Image from 'next/image';
import PostItemBadge from '@/components/post/PostItemBadge';
import PostItem from '@/components/post/PostItem';
import { POST_TYPES } from '@/constants/post';
import { getAllPosts } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/Post';

// ----------------------------------------------------------------

/**
 * 1. Podsetiti Matea da mi objasni za Error Boundries?!?!?!?!?!??!?!???!??!????!???!?!?!??!??!?
 */

const Home: React.FC = async () => {
  const session = await auth();

  if (!session) return null;

  const posts: IPost[] = await getAllPosts();

  console.log('posts u Home page-u', posts);
  // const tags = await getAllTags();

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
      <div className="flex-between mb-5">
        <h2 className="h2-bold">Recent Posts</h2>
        <div className="flex gap-3.5 ">
          {POST_TYPES.map(({ value }) => (
            <PostItemBadge key={value} postType={value} />
          ))}
        </div>
      </div>
      <ul className="flex flex-col gap-5">
        {posts.length > 0 ? (
          posts.map(({ _id, title, tags, type }) => (
            <PostItem
              key={_id}
              title={title}
              postType={type}
              postId={_id}
              tags={tags}
            />
          ))
        ) : (
          <h2 className="h2-bold text-center">
            There are no posts to display!
          </h2>
        )}
      </ul>
    </section>
  );
};

export default Home;