import { Suspense } from 'react';

import { getPostById } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/Post';
import PostDetails from '@/components/post/PostDetails';

// ----------------------------------------------------------------

interface IPostDetailsPage {
  params: { id: string };
}

const PostDetailsPage: React.FC<IPostDetailsPage> = async ({ params }) => {
  const { id } = params;

  const post: IPost | undefined = await getPostById(id);

  if (!post)
    return <h1 className="h1-bold text-center">Could not find post!</h1>;

  return (
    <Suspense fallback="Loading...">
      <PostDetails post={post} />
    </Suspense>
  );
};

export default PostDetailsPage;
