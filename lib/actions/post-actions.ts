'use server';

import { connectToMongoDB } from '../database/mongodb';
import { IPostSchema } from '../zod/post-schema';

import { auth } from '@/auth';
import PostModel from '@/models/Post';
import TagModel from '@/models/Tag';
import { IPost } from '@/types/Post';

// ----------------------------------------------------------------

export const createNewPost = async (data: IPostSchema) => {
  console.log('data u create New Post', data);
  try {
    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

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

    const createdTags =
      newTags.length > 0
        ? (await TagModel.insertMany(newTags)).map((t) => t._id.toString())
        : [];

    tags.concat(createdTags);

    const newPost = await PostModel.create({
      ...data,
      tags,
      ownerId: session.user.id,
    });

    return {
      ok: true,
      code: 201,
      redirectRoute: '/post/' + newPost._id.toString(),
    };
  } catch (error) {
    console.log('Error creating new post!', error);
  }
};

interface IGetAllPostsResponse {
  ok: boolean;
  status: number;
  posts: IPost[];
  totalPosts: number;
}

export const getAllPosts = async (): Promise<
  IGetAllPostsResponse | undefined
> => {
  try {
    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    await connectToMongoDB();

    const posts: IPost[] = await PostModel.find({ ownerId: session.user.id })
      .populate('tags')
      .lean();
    const postsCount = await PostModel.find({
      ownerId: session.user.id,
    }).countDocuments({});

    return {
      ok: true,
      status: 200,
      posts: JSON.parse(JSON.stringify(posts)),
      totalPosts: postsCount,
    };
  } catch (error) {
    console.log('Error fetching posts!', error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    await connectToMongoDB();

    const post = await PostModel.findById(postId).populate('tags').lean();
    // console.log(' getPostById post', post);

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.log('Error fetching post with specific ID', error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await connectToMongoDB();
    await PostModel.findByIdAndDelete(postId);

    return { ok: true, code: 200 };
  } catch (error) {
    console.log('Error deleting post!', error);
  }
};
