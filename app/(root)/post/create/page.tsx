import { Suspense } from 'react';

import { auth } from '@/auth';
import { getTags } from '@/lib/actions/tag-actions';
import type { ITagWithId } from '@/models/Tag';
import CreatePostContainer from '@/components/containers/CreatePostContainer';

// ----------------------------------------------------------------

const CreatePost = async () => {
  const session = await auth();
  if (!session?.user.id) return;

  const tags: ITagWithId[] = await getTags(session.user.id);

  if (!tags) return null;

  const modifiedTags = tags.map((tag) => ({
    label: tag.title,
    value: tag._id.toString(),
  }));

  return (
    <Suspense fallback="Loading...">
      <CreatePostContainer tags={modifiedTags} />
    </Suspense>
  );
};

export default CreatePost;
