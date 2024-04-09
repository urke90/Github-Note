'use server';

import { connectToMongoDB } from '../database/mongodb';
import Tag from '@/models/Tag';
import { ITagSchema } from '../zod/tag-schema';

export const createTag = async ({ title, ownerId }: ITagSchema) => {
  try {
    await connectToMongoDB();

    const newTag = new Tag({ title, ownerId });
    const createdTag = await newTag.save();

    return JSON.parse(JSON.stringify(createdTag));
  } catch (error) {
    console.log('Error creating tag!', error);
  }
};

export const getTags = async (ownerId: string) => {
  try {
    await connectToMongoDB();

    const tags = await Tag.find({ ownerId });

    return JSON.parse(JSON.stringify(tags));
  } catch (error) {
    console.log('Error fetching tags', error);
  }
};
