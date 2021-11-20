import { OAuthProvider } from '../types/auth';

export const authorizeWithProvider = (provider: OAuthProvider): void => {
  let params: string = new URLSearchParams({
    provider,
    redirect_uri: getOAuthRedirectUri(provider),
  }).toString();
  const authUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth/authorize?${params}`;

  window.location.assign(authUrl);
};

export const getOAuthRedirectUri = (provider: OAuthProvider): string => {
  return `${window.location.origin}/auth/callback/${provider}`;
};
