import { ReactElement } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Header = (): ReactElement => {
  const { isReady, isLoggedIn, openLoginModal, logout } = useAuth();

  return (
    <>
      <header className="w-full fixed bg-white shadow-md z-10">
        <div className="container mx-auto h-16">
          <div className="flex items-center h-full px-4 md:px-0">
            <div className="flex-auto">
              <Link href="/">🚀 HOME</Link>
            </div>
            <div className="flex-initial">
              {isReady && !isLoggedIn && (
                <button
                  className="text-md ml-auto uppercase"
                  onClick={openLoginModal}
                >
                  Login
                </button>
              )}
              {isLoggedIn && (
                <button className="text-md ml-auto uppercase" onClick={logout}>
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
