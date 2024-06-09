import { Label } from '../ui/label';

import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------

interface IUploadProfileImageProps {
  existingAvatarImage: string;
}

const UploadProfileImage: React.FC<IUploadProfileImageProps> = ({
  existingAvatarImage,
}) => {
  const { setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState(existingAvatarImage);

  const onSuccessUpload = (result: CloudinaryUploadWidgetResults) => {
    if (!result?.info || typeof result?.info === 'string')
      throw new Error('Image not uploaded');
    setImagePreview(result.info.secure_url);
    setValue(
      'avatarImg',
      (result.info as CloudinaryUploadWidgetInfo).secure_url
    );
  };

  return (
    <div className="mb-6 flex flex-row items-center">
      <div>
        {imagePreview ? (
          <CldImage
            src={imagePreview}
            alt="Upload Image"
            width={90}
            height={90}
            crop="fill"
            className="mr-3.5 rounded-[5px] "
          />
        ) : (
          <Image
            src="/assets/icons/image-upload-placeholder.svg"
            alt="Upload Image"
            width={90}
            height={90}
            className="mr-3.5 rounded-[5px] object-scale-down"
          />
        )}
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

export default UploadProfileImage;
