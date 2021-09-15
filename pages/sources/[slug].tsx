import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import fetcher from '../../api/fetcher';
import Feed from '../../components/Feed';
import { Source } from '../../types/source';
import TwitterLogo from '../../public/icons/twitter.svg';
import LinkIcon from '../../public/icons/link.svg';
import { useAuth } from '../../contexts/AuthContext';
import { followSource, unfollowSource } from '../../api/source';

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
      <div className="bg-gray-100">
        <div className="container mx-auto py-8">
          {source && (
            <>
              <div>
                <Image
                  src={source.imageUrl}
                  alt={source.name + ' logo'}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <h1 className="mt-5 text-5xl text-gray-800">{source?.name}</h1>
                <p className="mt-5 text-xl text-gray-600">
                  How hackers start their afternoons.
                </p>
              </div>
              <div className="flex justify-between mt-8">
                <div className="flex">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    className="flex"
                    rel="noreferrer"
                  >
                    <TwitterLogo />
                    <span className="ml-2">username</span>
                  </a>
                  <a
                    href="https://news.ycombinator.com/"
                    target="_blank"
                    className="flex ml-5"
                    rel="noreferrer"
                  >
                    <LinkIcon width="22" />
                    <span className="ml-1">example.com</span>
                  </a>
                </div>
                <div>
                  <span className="text-lg">
                    {source.followersCount + ' followers'}
                  </span>
                  <button onClick={handleFollowClick} className="ml-4">
                    {source.isFollowing ? 'FOLLOWING' : 'FOLLOW'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="container mx-auto">
        <h1 className="my-10 text-center font-light">All stories</h1>
        <div className="grid grid-cols-12 gap-x-2 md:gap-x-3 xl:gap-x-5">
          <div className="col-span-12 md:col-span-10 xl:col-span-8 md:col-start-2 xl:col-start-3">
            <Feed requestUrl={slug ? `/sources/${slug}/articles` : null} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SourcePage;
