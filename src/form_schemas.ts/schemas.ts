import * as z from "zod";

// Form field validation for creating and updating posts
export const postFormSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .max(200, { message: "Title cannot be longer than 200 characters" }),
  content: z
    .string()
    .nonempty("Content is required")
    .min(10, { message: "Content must be at least 10 characters" })
    .max(1000, { message: "Content cannot be longer than 1000 characters" }),
});
export type PostFormSchema = z.infer<typeof postFormSchema>;

// Form field validation for creating and updating comments
export const commentFormSchema = z.object({
  content: z
    .string()
    .nonempty("Comment cannot be empty")
    .max(1000, { message: "Comment cannot be longer than 1000 characters" }),
});
export type CommentFormSchema = z.infer<typeof commentFormSchema>
