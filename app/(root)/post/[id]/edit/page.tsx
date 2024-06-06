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
  if (!session?.user.id) {
    return <h2 className="h2-bold text-center">Something went wrong...</h2>;
  }

  const tags: ITag[] = (await getTags(session.user.id)) || [];

  const post: IPost | undefined = await getPostById(postId);

  const modifiedTags = tags.map((tag) => ({
    label: tag.title,
    value: tag._id.toString(),
  }));

  return <CreateOrUpdatePost tags={modifiedTags} post={post} />;
};

export default EditPostPage;
