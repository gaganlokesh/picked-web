type TokenType = 'Bearer';

export type OAuthProvider = 'google' | 'github' | 'twitter';

export interface TokenResponse {
  accessToken: string;
  tokenType: TokenType;
  expiresIn: number; // seconds
  createdAt: number;
  refreshToken?: string;
  scope?: string;
}

export interface Assertion {
  [key: string]: unknown;
}
