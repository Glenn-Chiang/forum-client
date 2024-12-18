import { snakeCase, camelCase } from "change-case/keys";

// Transform object with camelCased properties to JSON with snake_cased fields
export function serializeRequestBody(object: unknown): unknown {
  return snakeCase(object)
}

// Transform JSON response with snake_cased fields to object with camelCased properties
export function deserializeResponseBody<T>(res: unknown): T {
  return camelCase(res) as T
}
