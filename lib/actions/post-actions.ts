'use server';

import { connectToMongoDB } from '../database/mongodb';
import { IPostSchema } from '../zod/post-schema';

import mongoose, { FilterQuery } from 'mongoose';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import Post from '@/models/post';
import Tag from '@/models/tag';
import { IPost } from '@/types/post';
import { EPostType, EQueryPostType } from '@/types/post-types';

// ----------------------------------------------------------------

export const createNewPost = async (data: IPostSchema) => {
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
        ? (await Tag.insertMany(newTags)).map((t) => t._id.toString())
        : [];

    tags.concat(createdTags);

    const newPost = await Post.create({
      ...data,
      tags,
      ownerId: session.user.id,
    });

    return {
      ok: true,
      status: 201,
      redirectRoute: '/post/' + newPost._id.toString(),
    };
  } catch (error) {
    console.log('Error creating new post!', error);
    throw error;
  }
};

interface IGetAllPosts {
  page?: number;
  postType?: EQueryPostType;
  tags?: string[];
  itemsPerPage: number;
  searchQuery?: string;
}

export const getAllPosts = async ({
  page = 1,
  postType,
  tags,
  itemsPerPage,
  searchQuery,
}: IGetAllPosts) => {
  const skip = (Number(page) - 1) * itemsPerPage;

  try {
    const session = await auth();
    if (!session) throw new Error('User data not available!');

    let query: FilterQuery<IPost> = {
      ownerId: session.user.id,
    };

    if (searchQuery && searchQuery?.trim() !== '') {
      query = { ...query, title: { $regex: searchQuery, $options: 'i' } };
    }

    if (postType) {
      query = { ...query, type: postType.toUpperCase() as EPostType };
    }

    if (tags && tags?.length > 0) {
      const tagsArray = tags?.map((tag) => new RegExp(`^${tag}$`, 'i'));
      const fetchedTags = await Tag.find({ title: { $in: tagsArray } });
      const fetchedTagsIds = fetchedTags.map((tag) => tag._id);

      query = { ...query, tags: { $in: fetchedTagsIds } };
    }

    await connectToMongoDB();

    const posts = await Post.find(query)
      .populate('tags')
      .skip(skip)
      .limit(itemsPerPage);

    const postsCount = await Post.find(query).countDocuments({});

    const totalPages = Math.ceil(postsCount / itemsPerPage);
    const hasNextPage = Number(page) < totalPages;
    const hasPrevPage = Number(page) > 1;

    return {
      ok: true,
      status: 200,
      posts: JSON.parse(JSON.stringify(posts)),
      totalPages,
      hasNextPage,
      hasPrevPage,
    };
  } catch (error) {
    console.log('Error fetching posts!', error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    await connectToMongoDB();

    const post = await Post.findById(postId).populate('tags').lean();

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.log('Error fetching post with specific ID', error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await connectToMongoDB();
    await Post.findByIdAndDelete(postId);
    revalidatePath('/');
    return { ok: true, status: 200 };
  } catch (error) {
    console.log('Error deleting post!', error);
  }
};

export const getHeatMapPostsData = async () => {
  try {
    await connectToMongoDB();

    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    const formatedPostDates = await Post.aggregate([
      {
        $match: { ownerId: new mongoose.Types.ObjectId(session.user.id) },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          count: 1,
        },
      },
    ]);
    revalidatePath('/');
    return JSON.parse(JSON.stringify(formatedPostDates));
  } catch (error) {
    console.log('Error deleting post!', error);

    return [];
  }
};

export const updatePost = async (postId: string, data: IPostSchema) => {
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
        ? (await Tag.insertMany(newTags)).map((t) => t._id.toString())
        : [];

    tags.concat(createdTags);

    await Post.findByIdAndUpdate(postId, {
      ...data,
      tags: [...tags, ...createdTags],
    });

    revalidatePath('/post/[id]', 'page');

    return {
      ok: true,
      status: 200,
      redirectRoute: '/post/' + postId,
    };
  } catch (error) {
    console.log('Error updating post!', error);
    throw error;
  }
};

export const getRecentPosts = async () => {
  try {
    await connectToMongoDB();
    const session = await auth();
    if (!session) throw new Error('User from session is not available!');

    const posts = await Post.find({ ownerId: session.user.id })
      .select(['_id', 'type', 'title'])
      .limit(10)
      .sort({ createdAt: 'desc' });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log('Error fetching recent posts!', error);
    return null;
  }
};
