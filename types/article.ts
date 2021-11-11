import { Source } from './source';

export interface Article {
  id: number;
  title: string;
  url: string;
  canonicalUrl: string;
  authorName: string;
  imageUrl: string;
  publishedAt: Date;
  upvotesCount: number;
  imagePlaceholder?: string;
  readTime?: number;
  source?: Source;
  isUpvoted?: boolean;
  isBookmarked?: boolean;
}
