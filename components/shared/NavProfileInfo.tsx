import Image from 'next/image';

import { auth } from '@/auth';

// ----------------------------------------------------------------

const NavProfileInfo: React.FC = async () => {
  const session = await auth();
  // console.log('session', session);

  return (
    <section className="flex">
      <Image
        src={session?.user.image ?? ''}
        width={36}
        height={36}
        alt="Profile Image"
        className="mr-1.5"
      />
      <div>
        <p className="p3-medium text-white-100">{session?.user.name}</p>
        <p className="p4-regular">{session?.user.email}</p>
      </div>
    </section>
  );
};

export default NavProfileInfo;
