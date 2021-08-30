import { User } from "../types/user";
import client from "./client"

export const getLoggedInUser = (): Promise<User> => {
  return client.get("users/me")
    .then(res => {
      return res.data;
    })
  ;
}
