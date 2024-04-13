import { getPostById } from '@/lib/actions/post-actions';
import type { IPost } from '@/types/Post';

import { Suspense } from 'react';
import PostDetails from '@/components/post/PostDetails';

// ----------------------------------------------------------------

/**
 * pogledati tiny mce custom plugin za Warning code message
 * split SyntaxHighlighter i copy ot Clipboar u novu komponentu
 * kada je type === COMPONENT --> render codeExcample ;;;;  type === WORKFLOW || KNOWLEDGE renderuj checklist: string[]
 * izabcujemo stars i review izbacujem
 * react calendar heatmap ===> pratimo broj commitova pushova na / HOME
 */

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
