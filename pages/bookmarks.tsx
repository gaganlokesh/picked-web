import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Feed from '../components/Feed';
import { useAuth } from '../contexts/AuthContext';

export default function BookmarksPage(): ReactElement {
  const router = useRouter();
  const { isReady, isLoggedIn } = useAuth();

  if (!isReady) return <></>;

  if (isReady && !isLoggedIn) {
    router.replace('/');
    return <></>;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-start-4 col-span-6">
          <h1>Bookmarks</h1>
          <Feed requestUrl={isLoggedIn ? '/bookmarks' : null} />
        </div>
      </div>
    </>
  );
}
