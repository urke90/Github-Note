import { getCldImageUrl } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';

import { auth } from '@/auth';
import { CLOUDINARY_URL } from '@/constants';

// ----------------------------------------------------------------

const NavProfileInfo: React.FC = async () => {
  const session = await auth();
  let imageUrl = session?.user.image;
  if (
    session?.user.image !== '' &&
    session?.user.image?.startsWith(CLOUDINARY_URL)
  ) {
    imageUrl = getCldImageUrl({
      width: 36,
      height: 36,
      src: session?.user.image || '',
      crop: 'fill',
    });
  }

  return (
    <Link href="/profile" className="flex gap-1.5">
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
    </Link>
  );
};

export default NavProfileInfo;
