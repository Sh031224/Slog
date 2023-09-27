import * as z from 'zod';

export const commentSchema = z.object({
  content: z.string().min(1).max(255),
  isPrivate: z.boolean().or(z.literal('indeterminate')).default(false)
});
