import z from 'zod';

import { EPostType } from '@/types/post-types';

// ----------------------------------------------------------------

const learningResourcesSchema = z.object({
  label: z.string().trim().min(1, 'Please provide resource label!'),
  link: z
    .string()
    .trim()
    .url('Invalid URL! Url must begin with "https://" or "http://"'),
});

export type ILearningResources = z.infer<typeof learningResourcesSchema>;

const tagSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const postSchema = z.object({
  title: z.string().trim().min(2, 'Please enter the title of the post!'),
  type: z.enum([EPostType.COMPONENT, EPostType.KNOWLEDGE, EPostType.WORKFLOW]),
  tags: z.array(tagSchema).nonempty('Please add at leats one tag!'),
  description: z
    .string()
    .trim()
    .min(3, 'Please enter the description of the post'),
  checklist: z.array(z.string()).optional(),
  codeExample: z.string().trim().optional(),
  content: z
    .string()
    .trim()
    .min(3, 'Content must be at least 3 characters long!'),
  learningResources: z.array(learningResourcesSchema).optional(),
});

export type IPostSchema = z.infer<typeof postSchema>;
