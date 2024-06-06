'use client';

import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';

// ----------------------------------------------------------------

const NavProfileInfo: React.FC = () => {
  const { data: session } = useSession();

  return (
    <section className="flex gap-1.5">
      <CldImage
        src={session?.user.image ?? ''}
        width={36}
        height={36}
        crop="fill"
        alt="Profile Image"
        className="rounded-lg"
      />
      <div>
        <p className="p3-medium text-white-100">{session?.user.name}</p>
        <p className="p4-regular">{session?.user.email}</p>
      </div>
    </section>
  );
};

export default NavProfileInfo;
