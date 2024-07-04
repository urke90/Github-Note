import { Suspense } from 'react';

import PostDetails from '@/components/post/PostDetails';
import { getPostById } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/post';

// ----------------------------------------------------------------

interface IPostDetailsPage {
  params: { id: string };
}

const PostDetailsPage: React.FC<IPostDetailsPage> = async ({ params }) => {
  const id = params.id;

  const post: IPost | undefined = await getPostById(id);

  if (!post)
    throw new Error(
      "Something went wrong. Can't whow Post details at the moment!"
    );

  return (
    <Suspense fallback="Loading...">
      <PostDetails post={post} />
    </Suspense>
  );
};

export default PostDetailsPage;
