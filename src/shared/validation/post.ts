import { object, string, custom, union } from 'zod';

export const postSchema = object({
    image:custom<File>((v) => v instanceof File, { message: 'Image is required' }).optional(),
    title: string({ required_error: 'Enter post title' })
      .min(2, { message: 'Minimum 2 characters are required' })
      .max(100, { message: 'Maximum 100 characters are allowed' }),
    content: string({ required_error: 'Enter post content' })
      .min(2, { message: 'Minimum 2 characters are required' }),
    tags: string({ required_error: 'Enter tags'})
      .min(2, { message: 'Minimum 1 tag is required' }),
  });


export const editSchema=object({
  image: union([custom<File>((v) => v instanceof File, { message: 'Image is required' }).optional(), string().url()]),
  title: string({ required_error: 'Enter post title' })
    .min(2, { message: 'Minimum 2 characters are required' })
    .max(100, { message: 'Maximum 100 characters are allowed' }),
  content: string({ required_error: 'Enter post content' })
    .min(2, { message: 'Minimum 2 characters are required' }),
  tags: string({ required_error: 'Enter tags'})
    .min(2, { message: 'Minimum 1 tag is required' }),
});

export const commentSchema=object({
  content: string({ required_error: 'Comment required' })
})