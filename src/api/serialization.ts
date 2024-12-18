import { snakeCase } from "change-case/keys";

// Transform object with camelCased properties to JSON with snake_cased fields
export function serializeRequestBody(object: unknown): unknown {
  return snakeCase(object)
}
