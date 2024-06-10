'use client';

import RHFCheckbox from '../RHFInputs/RHFCheckbox';
import RHFDatePicker from '../RHFInputs/RHFDatePicker';
import RHFInput from '../RHFInputs/RHFInput';
import AddKnowledgeLevel from '../shared/AddKnowledgeLevel';
import AddLearningGoal from '../shared/AddLearningGoal';
import ProfileImageUpload from '../shared/ProfileImageUpload';
import { Form } from '../ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { IUpdateUserData, updateUserSchema } from '@/lib/zod/user-schema';
import type { IUser } from '@/types/user';

// ----------------------------------------------------------------

interface IProfileEditProps {
  user: IUser;
}

// ----------------------------------------------------------------

const ProfileEdit: React.FC<IProfileEditProps> = ({ user }) => {
  console.log('user TECH STACK', user.techStack);

  const form = useForm<IUpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user.fullName || '',
      email: user.email || '',
      avatarImg: user?.avatarImg || '',
      portfolioUrl: user?.portfolioUrl || '',
      learningGoals: user?.learningGoals || [],
      knowledgeLevel: user?.knowledgeLevel || [],
      techStack:
        user?.techStack.map((item) => ({ label: item, value: item })) || [],
      isAvailable: user?.isAvailable || false,
      startDate: user?.startDate ? new Date(user.startDate) : undefined,
      endDate: user?.endDate ? new Date(user.endDate) : undefined,
    },
  });

  const startDate = form.getValues('startDate');
  const endDate = form.getValues('endDate');

  // const onSubmit: SubmitHandler<IUpdateUserData> = (data) => {

  // };

  return (
    <section className="px-5 py-10 lg:px-[30px]">
      <h1 className="h1-bold mb-5">Edit Profile</h1>
      <p className="subtitle-small mb-6">Basic Information</p>
      <Form {...form}>
        <form>
          <ProfileImageUpload existingAvatarImage={user.avatarImg} />
          <div className="mb-10 flex flex-col gap-[30px]">
            <RHFInput
              name="fullName"
              label="Name"
              placeholder="Enter your name..."
            />
            <RHFInput
              name="email"
              label="Email"
              placeholder="Enter your email..."
              disabled
            />
            <RHFInput
              name="portfolio"
              label="Porfolio"
              placeholder="Enter link to your portfolio..."
            />
          </div>
          <div className="flex flex-col gap-10">
            <AddLearningGoal />
            <AddKnowledgeLevel />
            {/* <RHFCreatableSelect name="techStack" label="Tech Stack" /> */}
            <div>
              <RHFCheckbox
                name="isAvailable"
                label="Are you available for a new project?"
              />
              <div className="mb-6 mt-8 flex flex-wrap gap-6">
                <div className="flex-1">
                  <RHFDatePicker
                    name="startDate"
                    label="Start Date & Time"
                    description="The time is in your local timezone"
                    className="flex-1"
                    disableDateFn={(date) =>
                      (endDate && date > endDate) || date < new Date()
                    }
                  />
                </div>
                <div className="flex-1">
                  <RHFDatePicker
                    name="endDate"
                    label="End Date & Time"
                    description="The time is in your local timezone"
                    disableDateFn={(date) =>
                      (startDate && date < startDate) || date < new Date()
                    }
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default ProfileEdit;
