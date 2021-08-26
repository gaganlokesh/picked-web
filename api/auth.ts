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
    const { accessToken } = res.data;
    client.authorization = accessToken;

    return res.data;
  });
}

export const refreshAccessToken = (): Promise<TokenResponse> => {
  return client.post("oauth/token", {
    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
    grant_type: "refresh_token"
  })
  .then((res: AxiosResponse<TokenResponse>) => {
    const { accessToken } = res.data;
    client.authorization = accessToken;

    return res.data;
  });
}

export const revokeToken = (): Promise<void> => {
  return client.post("oauth/revoke", {
    client_id: process.env.NEXT_PUBLIC_API_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_API_CLIENT_SECRET,
    token: client.authorization
  })
  .then(res => {
    client.authorization = undefined;
  });
}
