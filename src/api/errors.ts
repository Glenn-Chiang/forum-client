import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Check if the error is from RTK query, i.e. due to API fetching/mutation
export function isApiError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

// Check if the API returns an error object that containts an "error" string
// If it does, extract the "error" string. Otherwise just return the object.
export function parseApiError(err: FetchBaseQueryError): string {
  return err.data && typeof err.data === "object" && "error" in err.data && typeof err.data.error === "string"
    ? err.data.error
    : JSON.stringify(err.data);
}
