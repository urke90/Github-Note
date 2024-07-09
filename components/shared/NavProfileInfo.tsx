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
      <div
        className={`${!imageUrl ? 'bg-black-700' : ''} flex-center size-9 rounded-sm`}
      >
        <Image
          src={imageUrl || '/assets/images/image-preview.svg'}
          width={imageUrl ? 36 : 18}
          height={imageUrl ? 36 : 18}
          alt="Profile Image"
          className="rounded-lg"
        />
      </div>
      <div>
        <p className="p3-medium text-white-100">{session?.user.name}</p>
        <p className="p4-regular">{session?.user.email}</p>
      </div>
    </Link>
  );
};

export default NavProfileInfo;
