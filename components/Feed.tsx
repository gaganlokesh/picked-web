import { ReactElement, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import fetcher from '../api/fetcher';
import { Article } from '../types/article';
import ArticleCard from './ArticleCard';
import ArticleLoader from './ArticleLoader';

const PAGE_SIZE = 15;

const getKey = (pageIndex, prevPageData): string => {
  if (prevPageData && !prevPageData.length) return null;

  return `/articles?per_page=${PAGE_SIZE}&page=${pageIndex + 1}`;
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

const Feed = (): ReactElement => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);
  const { ref: inViewRef, inView, entry } = useInView();
  const articles: Article[] = data ? [].concat(...data) : [];
  const isEmpty: boolean = data?.[0]?.length === 0;
  const isReachingEnd: boolean =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    if (inView) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [inView, setSize]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          <div ref={inViewRef}>{!isReachingEnd && <FeedLoader />}</div>
        </div>
      </div>
    </>
  );
};

export default Feed;
