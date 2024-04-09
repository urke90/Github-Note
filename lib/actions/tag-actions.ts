'use server';

import { connectToMongoDB } from '../database/mongodb';
import Tag from '@/models/Tag';
import { ITag } from '../zod/tag-schema';

export const createTag = async ({ title, ownerId }: ITag) => {
  try {
    await connectToMongoDB();
    const newTag = new Tag({ title, ownerId });
    const createdTag = await newTag.save();
    console.log('created tag', createdTag);
    return JSON.parse(JSON.stringify(createdTag));
  } catch (error) {
    console.log('Error creating tag!', error);
  }
};

export const getTags = async (ownerId: string) => {
  try {
    await connectToMongoDB();
    const tags = await Tag.find({ ownerId });
    // console.log('All tags', tags);
    return JSON.parse(JSON.stringify(tags));
  } catch (error) {
    console.log('Error fetching tags', error);
  }
};