'use client';

import { useSession } from 'next-auth/react';
import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';

// ----------------------------------------------------------------

const NavProfileInfo: React.FC = () => {
  const { data: session } = useSession();

  let imageUrl = '';
  if (session?.user.image !== '') {
    imageUrl = getCldImageUrl({
      width: 36,
      height: 36,
      src: session?.user.image || '',
      crop: 'fill',
    });
  }

  return (
    <section className="flex gap-1.5">
      <Image
        src={imageUrl || '/assets/icons/image-upload-placeholder.svg'}
        width={36}
        height={36}
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
