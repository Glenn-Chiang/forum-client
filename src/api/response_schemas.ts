import { camelCase } from "change-case/keys";
import { CamelCasedPropertiesDeep } from "type-fest";
import { z } from "zod";

// Functions to parse and transform JSON responses from API

// Transform JSON object with snake_case keys to object with camelCase keys
const camelize = <T extends Record<string, unknown>>(
  val: T
): CamelCasedPropertiesDeep<T> => camelCase(val) as CamelCasedPropertiesDeep<T>;

// JSON represents datetime fields as ISO strings, so we convert them to javascript Date objects
const timeSchema = z.string().transform((val) => new Date(val));

const userSchema = z
  .object({
    id: z.number(),
    username: z.string(),
  })
  .transform(camelize);

const topicSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .transform(camelize);

const postSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    author_id: z.number(),
    author: userSchema.optional(),
    topics: z.array(topicSchema),
    created_at: timeSchema,
    updated_at: timeSchema,
  })
  .transform(camelize);

const commentSchema = z
  .object({
    id: z.number(),
    content: z.string(),
    post_id: z.number(),
    author_id: z.number(),
    author: userSchema,
    created_at: timeSchema,
    updated_at: timeSchema,
  })
  .transform(camelize);

export const parseUser = (data: unknown) => userSchema.parse(data);
export const parseUsers = (data: unknown) => z.array(userSchema).parse(data);

export const parsePost = (data: unknown) => postSchema.parse(data);
export const parsePosts = (data: unknown) => z.array(postSchema).parse(data);

export const parseComment = (data: unknown) => commentSchema.parse(data);
export const parseComments = (data: unknown) =>
  z.array(commentSchema).parse(data);

export const parseTopic = (data: unknown) => topicSchema.parse(data);
export const parseTopics = (data: unknown) => z.array(topicSchema).parse(data);
