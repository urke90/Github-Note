import { Suspense } from 'react';
import { auth } from '@/auth';
import { getTags } from '@/lib/actions/tag-actions';
import type { ITag } from '@/models/Tag';
import CreatePostContainer from '@/components/containers/CreatePostContainer';

// ----------------------------------------------------------------

/**
 * 1. Da li treba da dohvatam Usera u Wrapper Page-u da bude Server side i da samo prosledim ovoj komponenti CreatePost (kao sto sam radio sa Onboardingom) ===>
 * 2. create post action proverava tagove. AKo ne postoji kreira nov/e tagove , ako postoji onda ne mora 2 poziva
 *
 * 1.  Mora get poziv za tagove da se  populate dropdown ( Onda imam sve tagove ---> imaju objectIds )
 * 2.
 *
 *
 * 1. crate Post
 *
 *
 * ?
 * 1. sta da radim sa Type za tags koji fetcujem s obzirom da imam _id koji dobijam od mongoose
 */

const CreatePost = async () => {
  const session = await auth();
  if (!session?.user.id) return;

  const tags: ITag[] = await getTags(session.user.id);

  if (!tags) return null;

  const modifiedTags = tags.map((tag) => ({
    label: tag.title,
    value: tag._id.toString(),
  }));

  return (
    <Suspense fallback="Loading...">
      <CreatePostContainer tags={modifiedTags} userId={session.user.id} />
    </Suspense>
  );
};

export default CreatePost;
