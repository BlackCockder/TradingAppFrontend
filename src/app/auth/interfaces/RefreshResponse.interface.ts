export interface RefreshResponse {
  authenticationToken: string;
  refreshToken: string;
  expiresAt: Date;
  username: string;
  id: number;
}
