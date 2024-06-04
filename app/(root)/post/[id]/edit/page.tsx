import { Suspense } from 'react';

import { auth } from '@/auth';
import CreateOrUpdatePost from '@/components/post/CreateOrUpdatePost';
import { getPostById } from '@/lib/actions/post-actions';
import { getTags } from '@/lib/actions/tag-actions';
import { IPost } from '@/types/post';
import type { ITag } from '@/types/tag';

// ----------------------------------------------------------------
interface IEditPostPageProps {
  params: {
    id: string;
  };
}

const EditPostPage: React.FC<IEditPostPageProps> = async ({ params }) => {
  const postId = params.id;

  const session = await auth();
  if (!session?.user.id) return;

  const tags: ITag[] = (await getTags(session.user.id)) || [];

  const post: IPost | undefined = await getPostById(postId);

  const modifiedTags = tags.map((tag) => ({
    label: tag.title,
    value: tag._id.toString(),
  }));

  return (
    <Suspense fallback="Loading...">
      <CreateOrUpdatePost tags={modifiedTags} post={post} isEditPage />
    </Suspense>
  );
};

export default EditPostPage;
