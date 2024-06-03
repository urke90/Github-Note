'use client';

import RHFInput from '../RHFInputs/RHFInput';
import { Button } from '../ui/button';
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

import { IUserOnboarding } from '@/lib/zod/onboarding-schema';
import { EOnboardingStep } from '@/types/onboarding-step';

// ----------------------------------------------------------------

interface IBasicInformationsProps {
  handleChangeStep: (
    // eslint-disable-next-line no-unused-vars
    data: Partial<IUserOnboarding>,
    // eslint-disable-next-line no-unused-vars
    newStep: EOnboardingStep
  ) => void;
}

const BasicInformations: React.FC<IBasicInformationsProps> = ({
  handleChangeStep,
}) => {
  const { trigger, setValue, getValues } = useFormContext();
  const [uploadedImage, setUploadedImage] = useState('');

  const onSuccessUpload = (result: CloudinaryUploadWidgetResults) => {
    if (!result?.info || typeof result?.info === 'string')
      throw new Error('Image not uploaded');
    setUploadedImage(result.info.secure_url);
    setValue(
      'avatarImg',
      (result.info as CloudinaryUploadWidgetInfo).secure_url
    );
  };

  const validateAndChangeStep = async () => {
    const validInputs = await trigger([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    if (!validInputs) return;

    const [fullName, portfolioUrl, avatarImg] = getValues([
      'fullName',
      'portfolioUrl',
      'avatarImg',
    ]);

    await handleChangeStep(
      {
        fullName,
        portfolioUrl,
        avatarImg,
        onboardingStep: EOnboardingStep.LEARNING_GOALS,
      },
      EOnboardingStep.LEARNING_GOALS
    );
  };

  return (
    <section>
      <div className="mb-6 flex flex-row items-center">
        <div>
          <CldImage
            src={
              uploadedImage ||
              `${'/assets/images/image-upload-placeholder.svg'}`
            }
            alt="Upload Image"
            width={90}
            height={90}
            className="mr-3.5 rounded-[5px]"
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
              src="/assets/images/icn-upload-cloud.png"
              alt="Upload Image Cloud"
              width={16}
              height={16}
            />
            <span className="p3-medium">Update Profile Picture</span>
          </CldUploadButton>
        </Label>
      </div>
      <div>
        <div className="mb-4">
          <RHFInput label="Name" name="fullName" placeholder="Edit your Name" />
        </div>
        <div className="mb-4">
          <RHFInput
            label="Portfolio"
            name="portfolioUrl"
            placeholder="Edit portfolio link"
          />
        </div>
        <Button type="button" onClick={validateAndChangeStep}>
          Next
        </Button>
      </div>
    </section>
  );
};

export default BasicInformations;
