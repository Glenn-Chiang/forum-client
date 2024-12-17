import { User } from "../api/models";

// Object sent from API upon login
export interface AuthPayload {
  token: string,
  user: User
}
