import { AxiosResponse } from "axios";
import { AuthProvider, TokenResponse } from "../types/auth";
import client from "./client";

export async function getAccessToken(provider: AuthProvider, assertion: string): Promise<TokenResponse> {
  const response = await client.post("oauth/token", {
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

  return response;
}

export async function refreshAccessToken(token: string): Promise<TokenResponse> {
  const response = await client.post("oauth/token", {
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

  return response;
}
