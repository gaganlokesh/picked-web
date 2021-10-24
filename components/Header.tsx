import { ReactElement } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';

const Header = (): ReactElement => {
  const { isReady, isLoggedIn, openLoginModal, logout } = useAuth();

  return (
    <>
      <header className="fixed z-10 w-full bg-white shadow-md">
        <div className="container h-16 mx-auto">
          <div className="flex items-center h-full">
            <div className="flex-auto">
              <Link href="/">🚀 HOME</Link>
              {isLoggedIn && <Link href="/bookmarks">BOOKMARKS</Link>}
            </div>
            <div className="flex-initial">
              {isReady && !isLoggedIn && (
                <Button onClick={openLoginModal}>Get started</Button>
              )}
              {isLoggedIn && (
                <button className="ml-auto uppercase text-md" onClick={logout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
