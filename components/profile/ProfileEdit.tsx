'use client';

import { Form } from '../ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateUserSchema } from '@/lib/zod/user-schema';
import type { IUser } from '@/types/user';

// ----------------------------------------------------------------

interface IProfileEditProps {
  user: IUser;
}

// ----------------------------------------------------------------

const ProfileEdit: React.FC<IProfileEditProps> = ({ user }) => {
  console.log('user', user);

  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: user.fullName || '',
      email: user.email || '',
      avatarImg: user?.avatarImg || '',
      portfolioUrl: user?.portfolioUrl || '',
      learningGoals: user.learningGoals || '',
      knowledgeLevel: user.knowledgeLevel || [],
      techStack: user.techStack || '',
      isAvailable: user.isAvailable || false,
      startDate: user.startDate || undefined,
      endDate: user.endDate || undefined,
      createdAt: user.createdAt || '',
      updatedAt: user.updatedAt || '',
    },
  });

  return (
    <section className="px-5 py-10 lg:px-[30px]">
      <h1 className="h1-bold mb-5">Edit Profile</h1>
      <p className="subtitle-small mb-6">Basic Information</p>

      <Form {...form}>
        <form>This is form</form>
      </Form>
    </section>
  );
};

export default ProfileEdit;
