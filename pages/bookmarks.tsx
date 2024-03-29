import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Feed from '../components/Feed';
import AppLayout from '../components/layouts/AppLayout';
import { useAuth } from '../contexts/AuthContext';

function BookmarksPage(): ReactElement {
  const router = useRouter();
  const { isReady, isLoggedIn } = useAuth();

  if (!isReady) return <></>;

  if (isReady && !isLoggedIn) {
    router.replace('/');
    return <></>;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="mx-auto lg:max-w-3xl">
          <h1 className="my-10 lg:my-14">Bookmarks</h1>
          <Feed requestUrl={isLoggedIn ? '/bookmarks' : null} />
        </div>
      </div>
    </>
  );
}

BookmarksPage.getLayout = AppLayout;

export default BookmarksPage;
