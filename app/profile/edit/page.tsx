import { auth } from '@/auth';
import ProfileEdit from '@/components/profile/ProfileEdit';
import { getUserById } from '@/lib/actions/user-actions';
import type { IUser } from '@/types/user';

// ----------------------------------------------------------------

interface IEditProfilePageProps {}

const EditProfilePage: React.FC<IEditProfilePageProps> = async (props) => {
  const session = await auth();
  if (!session) throw new Error('User session not available!');

  const user: IUser = await getUserById(session.user.id);

  if (!user) throw new Error('User data not available');

  console.log('YUSER USER USER START DATE', user.startDate);
  console.log('YUSER USER USER START DATE TYPEOF', typeof user.startDate);
  console.log('YUSER USER USER created At', user.createdAt);
  console.log('YUSER USER USER crreated at typeof', typeof user.createdAt);

  return <ProfileEdit user={user} />;
};

export default EditProfilePage;
