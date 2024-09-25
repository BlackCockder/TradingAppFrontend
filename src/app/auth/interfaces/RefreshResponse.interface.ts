export interface RefreshResponse {
  authenticationToken: string;
  expiresAt: Date;
  username: string;
  id: number;
}
