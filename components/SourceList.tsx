import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import produce from 'immer';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import fetcher from '../api/fetcher';
import { followSource, unfollowSource } from '../api/source';
import { useAuth } from '../contexts/AuthContext';
import { Source } from '../types/source';
import SourceItem from './SourceItem';
import SourceItemLoader from './SourceItemLoader';

interface SourceListProps {
  requestEndpoint: string;
}

interface SourceListItem {
  source: Source;
  page: number;
  index: number;
}

const PAGE_SIZE = 15;

const getKey = (
  requestEndpoint: string,
  pageIndex: number,
  prevPageData
): string => {
  if (!requestEndpoint) return null;
  if (prevPageData && !prevPageData.length) return null;

  return `${requestEndpoint}?per_page=${PAGE_SIZE}&page=${pageIndex + 1}`;
};

const SourceList = ({ requestEndpoint }: SourceListProps): ReactElement => {
  const { isLoggedIn, openLoginModal } = useAuth();
  const { ref: inViewRef, inView } = useInView();
  const { data, isValidating, setSize, mutate } = useSWRInfinite<Source[]>(
    (...args) => getKey(requestEndpoint, ...args),
    fetcher
  );

  const isEmpty: boolean = data?.[0]?.length === 0;
  const isReachingEnd: boolean =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    if (inView && !isValidating) {
      setSize((prevSize) => prevSize + 1);
    }
  }, [inView]);

  const sourceItems = useMemo<SourceListItem[]>(() => {
    if (!data || data?.length === 0) return [];

    return data.flatMap((items: Source[], page) => {
      return items.map(
        (source, index): SourceListItem => ({
          source,
          page,
          index,
        })
      );
    });
  }, [data]);

  const handleFollowClick = useCallback(
    (source: Source, page: number, index: number, shouldFollow: boolean) => {
      if (!isLoggedIn) {
        openLoginModal();
        return;
      }

      const pages = data;
      const updateFollow = shouldFollow ? followSource : unfollowSource;

      // Optimistic update
      mutate(
        produce(data, (draft) => {
          draft[page][index].isFollowing = shouldFollow;
        }),
        false
      );

      updateFollow(source.slug).catch((err) => {
        console.error(err);
        // Rollback to previous state on failure
        mutate(pages, false);
      });
    },
    [data, isLoggedIn, mutate, openLoginModal]
  );

  return (
    <>
      <div className="divide-y divide-neutral-lighter">
        {sourceItems.map(({ source, page, index }) => (
          <SourceItem
            key={source.id}
            className="py-6"
            source={source}
            onFollow={(source: Source, shouldFollow: boolean) =>
              handleFollowClick(source, page, index, shouldFollow)
            }
          />
        ))}
      </div>
      <div ref={inViewRef}>
        {!isReachingEnd && (
          <>
            <SourceItemLoader className="py-6" />
            <SourceItemLoader className="py-6" />
            <SourceItemLoader className="py-6" />
            <SourceItemLoader className="py-6" />
            <SourceItemLoader className="py-6" />
          </>
        )}
      </div>
    </>
  );
};

export default SourceList;
