import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWR from 'swr';
import fetcher from '../../api/fetcher';
import Feed from '../../components/Feed';
import { Source } from '../../types/source';
import { useAuth } from '../../contexts/AuthContext';
import { followSource, unfollowSource } from '../../api/source';
import Button from '../../components/Button';
import SuggestedSources from '../../components/widgets/SuggestedSources';
import SourceDetail from '../../components/widgets/SourceDetail';

const SourcePage = (): ReactElement => {
  const router = useRouter();
  const { isReady, isLoggedIn, openLoginModal } = useAuth();
  const { slug } = router.query;
  const { data: source, mutate: updateSource } = useSWR<Source>(
    slug && isReady ? `/sources/${slug}` : null,
    fetcher
  );

  const handleFollowClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      const updateFollow = source.isFollowing ? unfollowSource : followSource;
      updateFollow(source?.slug).then(() => {
        updateSource();
      });
    }
  };

  return (
    <>
      <div className="container py-5 mx-auto">
        <div className="flex">
          <main className="flex-1 divide-y divide-neutral-light">
            <div className="flex items-end justify-between mb-7">
              <div>
                <span className="text-lg font-medium text-neutral">
                  Stories from
                </span>
                <br />
                <h2>{source?.name}</h2>
              </div>
              <div>
                <Button
                  className="mb-1 ml-4"
                  variant={source?.isFollowing ? 'solid' : 'outline'}
                  onClick={handleFollowClick}
                >
                  {source?.isFollowing ? 'Following' : 'Follow'}
                </Button>
              </div>
            </div>
            <div className="pt-8">
              <Feed requestUrl={slug ? `/sources/${slug}/articles` : null} />
            </div>
          </main>
          <div className="hidden mx-6 xl:mx-12 lg:block"></div>
          <aside className="hidden w-[325px] xl:w-[370px] lg:block">
            <div className="grid gap-y-6">
              <SourceDetail source={source} onFollowClick={handleFollowClick} />
              <SuggestedSources />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default SourcePage;
