import * as z from "zod";

// Form field validation for creating and updating posts
const POST_TITLE_MAX_LENGTH = 200;
const POST_CONTENT_MIN_LENGTH = 10;
const POST_CONTENT_MAX_LENGTH = 1000;

export const postFormSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .max(POST_TITLE_MAX_LENGTH, {
      message: `Title cannot be longer than ${POST_TITLE_MAX_LENGTH} characters`,
    }),
  content: z
    .string()
    .nonempty("Content is required")
    .min(POST_CONTENT_MIN_LENGTH, {
      message: `Content must be at least ${POST_CONTENT_MIN_LENGTH} characters`,
    })
    .max(POST_CONTENT_MAX_LENGTH, {
      message: `Content cannot be longer than ${POST_CONTENT_MAX_LENGTH} characters`,
    }),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;

// Form field validation for creating and updating comments
const COMMENT_MAX_LENGTH = 1000;

export const commentFormSchema = z.object({
  content: z
    .string()
    .nonempty("Comment cannot be empty")
    .max(COMMENT_MAX_LENGTH, {
      message: `Comment cannot be longer than ${COMMENT_MAX_LENGTH} characters`,
    }),
});

export type CommentFormSchema = z.infer<typeof commentFormSchema>;

// Form field validation for login and register
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 20;

export const authFormSchema = z.object({
  username: z
    .string()
    .nonempty("Username cannot be empty")
    .max(USERNAME_MAX_LENGTH, {
      message: `Username cannot be longer than ${USERNAME_MAX_LENGTH} characters`,
    }),
  password: z
    .string()
    .nonempty("Password cannot be empty")
    .min(PASSWORD_MIN_LENGTH, {
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
    })
    .max(
      PASSWORD_MAX_LENGTH,
      `Password must be at least ${PASSWORD_MAX_LENGTH} characters`
    ),
});
