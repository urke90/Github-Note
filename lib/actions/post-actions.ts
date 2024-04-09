'use server';

import { connectToMongoDB } from '../database/mongodb';
import { auth } from '@/auth';
import PostModel from '@/models/Post';
import { IPostSchema } from '../zod/post-schema';
import TagModel from '@/models/Tag';
import { redirect } from 'next/navigation';

// ----------------------------------------------------------------

export const createNewPost = async (data: IPostSchema) => {
  console.log('data u createPostu', data.tags);
  try {
    const session = await auth();
    if (!session) throw new Error("Can't get user from session!");

    await connectToMongoDB();

    const newTags = [];
    const tags: string[] = [];
    for (let i = 0; i < data.tags.length; i++) {
      const tag = data.tags[i];

      if (tag.value === tag.label) {
        newTags.push({ title: tag.label, ownerId: session.user.id });
        continue;
      }

      tags.push(tag.value);
    }

    const createdTags = newTags.length
      ? (await TagModel.insertMany(newTags)).map((t) => t._id.toString())
      : [];

    tags.concat(createdTags);

    const newPost = await PostModel.create({
      ...data,
      tags,
      ownerId: session.user.id,
    });

    redirect('/post/' + newPost._id);
  } catch (error) {
    console.log('Error creating new post!', error);
  }
};
