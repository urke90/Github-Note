import { EPostType } from './post-types';
import type { ITag } from './tag';

// ----------------------------------------------------------------

export interface IPost {
  _id: string;
  title: string;
  type: EPostType;
  tags: ITag[];
  description: string;
  ownerId: string;
  checklist?: string[];
  codeExample?: string;
  content?: string;
  learningResources?: {
    label: string;
    link: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface IPostsResponse {
  ok: boolean;
  status: number;
  posts: IPost[];
  totalPages: number;
  hasNextPage: boolean;
}

export interface IRecentPost {
  _id: string;
  title: string;
  type: EPostType;
}
