export interface Source {
  id: number;
  slug: string;
  name: string;
  imageUrl: string;
  websiteUrl: string;
  followersCount?: number;
  isFollowing?: boolean;
  feedUrl?: string;
}
