import { ReactElement } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import produce from 'immer';
import fetcher from '../../api/fetcher';
import { Source } from '../../types/source';
import SourceItem from '../SourceItem';
import SourceItemLoader from '../SourceItemLoader';
import { useAuth } from '../../contexts/AuthContext';
import { followSource, unfollowSource } from '../../api/source';

const SuggestedSources = (): ReactElement => {
  const { isReady, isLoggedIn, openLoginModal } = useAuth();
  const { data, error, mutate } = useSWR<Source[]>(
    isReady ? '/sources/suggested' : null,
    fetcher
  );

  const handleFollowClick = (source: Source, shouldFollow: boolean) => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    const prevData = data;
    const updateFollow = shouldFollow ? followSource : unfollowSource;

    mutate(
      produce(prevData, (draft) => {
        const index = draft.findIndex(({ id }) => id === source.id);
        if (index !== -1) draft[index].isFollowing = shouldFollow;
      }),
      false
    );

    updateFollow(source.slug).catch((err) => {
      console.error(err);
      mutate(prevData, false);
    });
  };

  if (error) return <></>;

  return (
    <>
      <div className="py-1 bg-neutral-lightest rounded-xl">
        <h4 className="px-5 py-3">Follow sources</h4>
        {data ? (
          <>
            {data?.map((source) => (
              <SourceItem
                key={source.id}
                className="px-5 py-3"
                size="sm"
                source={source}
                onFollow={handleFollowClick}
              />
            ))}

            <div className="px-5 py-3">
              <Link href="/sources">
                <a className="cursor-pointer text-primary">Show more</a>
              </Link>
            </div>
          </>
        ) : (
          <>
            <SourceItemLoader className="px-5 py-3" />
            <SourceItemLoader className="px-5 py-3" />
            <SourceItemLoader className="px-5 py-3" />
            <div className="py-2"></div>
          </>
        )}
      </div>
    </>
  );
};

export default SuggestedSources;
