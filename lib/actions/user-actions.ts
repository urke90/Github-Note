'use server';

import { connectToMongoDB } from '../database/mongodb';
import type {
  ISocialMediaLinks,
  IUpdateUserData,
  IUserOnboarding,
} from '../zod/user-schema';

import { genSalt, hash } from 'bcryptjs';
import { MongoError } from 'mongodb';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import User from '@/models/user';
import type { IUser } from '@/types/user';

// ----------------------------------------------------------------

export const getUserById = async (userId: string) => {
  try {
    await connectToMongoDB();

    const user = await User.findById<IUser>(userId);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log('Error getting user from MongoDB', error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    await connectToMongoDB();

    const user = await User.findOne<IUser>({ email });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log('Error getting user from MongoDB', error);
  }
};

export const createNewUser = async ({
  fullName,
  email,
  password,
  avatarImg,
}: {
  fullName: string;
  email: string;
  password: string;
  avatarImg?: string;
}) => {
  try {
    await connectToMongoDB();

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      avatarImg,
    });

    await newUser.save();

    return { ok: true, status: 201 };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'MongoError' && (error as MongoError).code === 11000)
        return { ok: false, status: 409 };
    }

    console.log('Error creating new user', error);
    return { ok: false, status: 500 };
  }
};

export const updateUserOnboardingStep = async (
  data: Partial<IUserOnboarding>
) => {
  try {
    const session = await auth();
    if (!session) throw new Error('Session not available');

    await connectToMongoDB();

    const modifiedTechStack = data.techStack?.map((item) => item.value);

    const user = await User.findByIdAndUpdate(session.user.id, {
      $set: {
        ...data,
        techStack: modifiedTechStack,
      },
    }).lean();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    if (error instanceof Error) {
      console.log('error update User Onboarding State', error instanceof Error);
    }
    if (error instanceof MongoError) {
      console.log(
        'error update User Onboarding State TYPEOF',
        error instanceof MongoError
      );
    }
    throw new Error('Something went wrong during updating onboarding step.');
  }
};

export const updateUserOnboarding = async (data: IUserOnboarding) => {
  try {
    const session = await auth();
    if (!session) throw new Error('Session not available');

    const modifiedTechStack = data.techStack.map((item) => item.value);

    await connectToMongoDB();
    await User.findByIdAndUpdate(
      session.user.id,
      {
        ...data,
        techStack: modifiedTechStack,
      },
      {
        new: true,
      }
    );

    return { ok: true, status: 200 };
  } catch (error) {
    console.log('Error updating user onboarding', error);
    throw new Error('Something went wrong during onboarding.');
  }
};

export const updateUser = async (data: IUpdateUserData) => {
  try {
    const session = await auth();
    if (!session) throw new Error('Session not available');
    await connectToMongoDB();

    const modifiedTechStack = data.techStack.map((item) => item.value);

    await User.findByIdAndUpdate(session.user.id, {
      ...data,
      techStack: modifiedTechStack,
    });
    revalidatePath('/profile');

    return { ok: true, status: 200 };
  } catch (error) {
    console.log('Error updating user', error);
    throw new Error("Something went wrong, couldn't update user");
  }
};

export const updateUserSocialMediaLinks = async (data: ISocialMediaLinks) => {
  try {
    await connectToMongoDB();
    const session = await auth();
    if (!session) throw new Error('Session not available');

    const updatedUser = await User.findByIdAndUpdate(session.user.id, data);
    if (!updatedUser) throw new Error('User not updated!');

    revalidatePath('/profile');
    revalidatePath('/profile/edit');

    return { ok: true, status: 200 };
  } catch (error) {
    throw new Error("Something went wrong, couldn't update user");
  }
};
