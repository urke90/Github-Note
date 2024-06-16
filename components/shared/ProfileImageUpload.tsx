import { Label } from '../ui/label';

import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
  getCldImageUrl,
} from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { CLOUDINARY_URL } from '@/constants';

// ----------------------------------------------------------------

interface IProfileImageUploadProps {
  existingAvatarImage?: string;
}

const ProfileImageUpload: React.FC<IProfileImageUploadProps> = ({
  existingAvatarImage = '',
}) => {
  let transformedAvatarImage = existingAvatarImage;

  if (existingAvatarImage.startsWith(CLOUDINARY_URL)) {
    transformedAvatarImage = getCldImageUrl({
      width: 90,
      height: 90,
      src: existingAvatarImage,
      crop: 'fill',
    });
  }

  const { setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState(transformedAvatarImage);

  const onSuccessUpload = (result: CloudinaryUploadWidgetResults) => {
    if (!result?.info || typeof result?.info === 'string')
      throw new Error('Image not uploaded');

    const imageUrl = getCldImageUrl({
      width: 90,
      height: 90,
      src: result.info.secure_url,
      crop: 'fill',
    });

    setImagePreview(imageUrl);
    setValue(
      'avatarImg',
      (result.info as CloudinaryUploadWidgetInfo).secure_url
    );
  };

  return (
    <div className="flex flex-row items-center gap-3.5">
      <div>
        <Image
          src={imagePreview || '/assets/icons/image-upload-placeholder.svg'}
          alt="Upload Image"
          width={90}
          height={90}
          className="rounded"
        />
      </div>
      <Label className="flex-center w-[200px] cursor-pointer gap-2 rounded-md bg-black-700 p-2">
        <CldUploadButton
          className="flex items-center gap-2"
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME ?? ''}
          onSuccess={onSuccessUpload}
          options={{
            multiple: false,
            cropping: true,
            croppingShowDimensions: true,
          }}
        >
          <Image
            src="/assets/images/icn-upload-cloud.svg"
            alt="Upload Image Cloud"
            width={16}
            height={16}
          />
          <span className="p3-medium">Update Profile Picture</span>
        </CldUploadButton>
      </Label>
    </div>
  );
};

export default ProfileImageUpload;
