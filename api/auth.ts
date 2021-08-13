import { AxiosResponse } from "axios";
import { OAuthProvider, TokenResponse } from "../types/auth";
import client from "./client";

export const getAccessToken = (provider: OAuthProvider, assertion: string): Promise<TokenResponse> => {
  return client.post("oauth/token", {
    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
    grant_type: "assertion",
    assertion,
    provider
  })
  .then((res: AxiosResponse<TokenResponse>) => {
    return res.data;
  })
  .catch((err) => {
    // Handle error case
    return err;
  });
}

export const refreshAccessToken = (token: string): Promise<TokenResponse> => {
  return client.post("oauth/token", {
    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: token
  })
  .then((res: AxiosResponse<TokenResponse>) => {
    return res.data;
  })
  .catch((err) => {
    // Handle error case
    return err;
  });
}
