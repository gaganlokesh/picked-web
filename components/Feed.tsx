import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import produce from 'immer';
import fetcher from '../api/fetcher';
import { addBookmark, removeBookmark } from '../api/article';
import { Article } from '../types/article';
import ArticleCard from './ArticleCard';
import ArticleLoader from './ArticleLoader';
import FeedItem from './FeedItem';
import { useAuth } from '../contexts/AuthContext';

interface FeedProps {
  requestUrl: string;
}

interface FeedItem {
  article: Article;
  page: number;
  index: number;
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
    <ArticleLoader className="py-3 md:py-5" />
    <ArticleLoader className="py-3 md:py-5" />
    <ArticleLoader className="py-3 md:py-5" />
    <ArticleLoader className="py-3 md:py-5" />
    <ArticleLoader className="py-3 md:py-5" />
  </>
);

const Feed = ({ requestUrl }: FeedProps): ReactElement => {
  const { isLoggedIn, openLoginModal } = useAuth();
  const { ref: inViewRef, inView } = useInView();
  const { data, setSize, isValidating, mutate } = useSWRInfinite<Article[]>(
    (...args) => generateFeedKey(requestUrl, ...args),
    fetcher
  );

  const feedItems = useMemo<FeedItem[]>(() => {
    if (!data || data?.length === 0) return [];

    return data.flatMap((items: Article[], page) => {
      return items.map(
        (article, index): FeedItem => ({
          article,
          page,
          index,
        })
      );
    });
  }, [data]);

  const isEmpty: boolean = data?.[0]?.length === 0;
  const isReachingEnd: boolean =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    if (inView && !isValidating) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [inView]);

  const handleBookmarkClick = useCallback(
    (
      articleId: number,
      page: number,
      index: number,
      shouldBookmark: boolean
    ) => {
      if (!isLoggedIn) {
        openLoginModal();
        return;
      }

      const pages = data;
      const updateBookmark = shouldBookmark ? addBookmark : removeBookmark;

      // Optimistic update
      mutate(
        produce(data, (draft) => {
          draft[page][index].isBookmarked = shouldBookmark;
        }),
        false
      );

      updateBookmark(articleId).catch((err) => {
        console.error(err);
        // Rollback to previous state on failure
        mutate(pages, false);
      });
    },
    [data, isLoggedIn, mutate, openLoginModal]
  );

  return (
    <>
      <div>
        {feedItems.map(({ article, page, index }) => (
          <ArticleCard
            className="py-3 md:py-5"
            key={article?.id}
            article={article}
            onBookmarkClick={(id, shouldBookmark) =>
              handleBookmarkClick(id, page, index, shouldBookmark)
            }
          />
        ))}
        <div ref={inViewRef}>{!isReachingEnd && <FeedLoader />}</div>
      </div>
    </>
  );
};

export default Feed;
