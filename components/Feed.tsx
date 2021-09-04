import { ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSWRInfinite } from 'swr';
import fetcher from '../api/fetcher';
import { Article } from '../types/article';
import ArticleCard from './ArticleCard';
import ArticleLoader from './ArticleLoader';

interface FeedProps {
  requestUrl: string;
}

const PAGE_SIZE = 15;

const generateFeedKey = (
  requestUrl: string,
  pageIndex: number,
  prevPageData
): string => {
  if (!requestUrl) return null;
  if (prevPageData && !prevPageData.length) return null;

  return `${requestUrl}?per_page=${PAGE_SIZE}&page=${pageIndex + 1}`;
};

const FeedLoader = (): ReactElement => (
  <>
    <ArticleLoader />
    <ArticleLoader />
    <ArticleLoader />
    <ArticleLoader />
    <ArticleLoader />
  </>
);

const Feed = ({ requestUrl }: FeedProps): ReactElement => {
  const { ref: inViewRef, inView } = useInView();
  const { data, setSize, isValidating } = useSWRInfinite(
    (...args) => generateFeedKey(requestUrl, ...args),
    fetcher
  );

  const articles: Article[] = data ? [].concat(...data) : [];
  const isEmpty: boolean = data?.[0]?.length === 0;
  const isReachingEnd: boolean =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    if (inView && !isValidating) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [inView]);

  return (
    <>
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        <div ref={inViewRef}>{!isReachingEnd && <FeedLoader />}</div>
      </div>
    </>
  );
};

export default Feed;
