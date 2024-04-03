import z from 'zod';

// ----------------------------------------------------------------

const tagSchema = z.object({
  title: z.string().min(3, 'Please add tag title!'),
});

export type ITag = z.infer<typeof tagSchema>;
