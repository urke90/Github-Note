import { Suspense } from 'react';

import { auth } from '@/auth';
import CreateOrUpdatePost from '@/components/post/CreateOrUpdatePost';
import { getTags } from '@/lib/actions/tag-actions';
import type { ITag } from '@/types/tag';

// ----------------------------------------------------------------

const CreatePostPage = async () => {
  const session = await auth();
  if (!session?.user.id) return;

  const tags: ITag[] = (await getTags(session.user.id)) || [];

  const modifiedTags = tags.map((tag) => ({
    label: tag.title,
    value: tag._id.toString(),
  }));

  return (
    <Suspense fallback="Loading...">
      <CreateOrUpdatePost tags={modifiedTags} />
    </Suspense>
  );
};

export default CreatePostPage;
