import { camelCase } from "change-case/keys";
import { CamelCasedPropertiesDeep } from "type-fest";
import { z } from "zod";

// Functions to parse and transform JSON responses from API

// Transform JSON object with snake_case keys to object with camelCase keys
const camelize = <T extends Record<string, unknown>>(
  val: T
): CamelCasedPropertiesDeep<T> => camelCase(val) as CamelCasedPropertiesDeep<T>;

export const userSchema = z
  .object({
    id: z.number(),
    username: z.string(),
  })
  .transform(camelize);

export const topicSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .transform(camelize);

export const postSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    author_id: z.number().nullable(),
    author: userSchema.nullable(), // Author is null if the corresponding user is deleted
    topics: z.array(topicSchema),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .transform(camelize);

export const postListSchema = z.object({
  data: z.array(postSchema),
  total_count: z.number(),
});

export const commentSchema = z
  .object({
    id: z.number(),
    content: z.string(),
    post_id: z.number(),
    author_id: z.number().nullable(),
    author: userSchema.nullable(), // Author is null if the corresponding user is deleted
    created_at: z.string(),
    updated_at: z.string(),
  })
  .transform(camelize);

export const commentListSchema = z.object({
  data: z.array(commentSchema),
  total_count: z.number(),
});

export const parseUser = (data: unknown) => userSchema.parse(data);
export const parseUsers = (data: unknown) =>
  z.array(userSchema).parse(data);

export const parsePost = (data: unknown) => postSchema.parse(data);
export const parsePosts = (data: unknown) => postListSchema.parse(data);

export const parseComment = (data: unknown) => commentSchema.parse(data);
export const parseComments = (data: unknown) => commentListSchema.parse(data);

export const parseTopic = (data: unknown) => topicSchema.parse(data);
export const parseTopics = (data: unknown) =>
  z.array(topicSchema).parse(data);

