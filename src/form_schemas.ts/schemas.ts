import * as z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .max(200, { message: "Title cannot be longer than 200 characters" }),
  content: z
    .string()
    .nonempty("Content is required")
    .min(10, { message: "Content must be at least 10 characters" }),
});
export type CreatePostSchema = z.infer<typeof createPostSchema>;
