type TokenType = "Bearer"

export type AuthProvider = "google" | "github";

export interface TokenResponse {
  accessToken: string
  tokenType: TokenType
  expiresIn: number // seconds
  createdAt: number
  refreshToken: string
  scope?: string
}
