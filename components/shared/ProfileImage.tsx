'use client';

import { CldImage } from 'next-cloudinary';
import Image from 'next/image';

// ----------------------------------------------------------------

interface IProfileImageProps {
  avatarImg?: string;
}

const ProfileImage: React.FC<IProfileImageProps> = ({ avatarImg }) => {
  return (
    <>
      {avatarImg ? (
        <CldImage
          crop="fill"
          src={avatarImg}
          width={90}
          height={90}
          alt="Avatart"
          className="shrink-0 rounded-[5px]"
        />
      ) : (
        <Image
          src="/assets/icons/image-upload-placeholder.svg"
          width={90}
          height={90}
          alt="Avatart"
          className="shrink-0 rounded-[5px]"
        />
      )}
    </>
  );
};

export default ProfileImage;
