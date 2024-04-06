import z from 'zod';
import { Schema } from 'mongoose';

// ----------------------------------------------------------------

export const tagSchema = z.object({
  title: z.string().min(3, 'Please add tag title!'),
  ownerId: z.instanceof(Schema.Types.ObjectId),
});

export type ITag = z.infer<typeof tagSchema>;
