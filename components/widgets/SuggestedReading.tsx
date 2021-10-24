import { ReactElement } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from '../../api/fetcher';
import { useAuth } from '../../contexts/AuthContext';
import { Article } from '../../types/article';
import ArticleCard from '../ArticleCard';

const SuggestedReading = (): ReactElement => {
  const { isLoggedIn } = useAuth();
  const { data, error } = useSWR<Article[]>(
    isLoggedIn ? '/bookmarks?per_page=5' : null,
    fetcher
  );

  if (!isLoggedIn || error || data?.length < 3) return <></>;

  return (
    <div className="py-1 bg-neutral-lightest rounded-xl">
      <h4 className="px-5 py-3">Suggested reading</h4>
      {data?.map((article) => (
        <ArticleCard
          className="px-5 py-3"
          key={article.id}
          variant="minimal"
          article={article}
        />
      ))}
      <div className="px-5 py-3">
        <Link href="/bookmarks">
          <a className="cursor-pointer text-primary">Show more</a>
        </Link>
      </div>
    </div>
  );
};

export default SuggestedReading;
