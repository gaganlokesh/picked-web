import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import { Popover } from '@headlessui/react';

const Header = (): ReactElement => {
  const { user, isReady, isLoggedIn, openLoginModal, logout } = useAuth();

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
              {isLoggedIn && !!user && (
                <>
                  <div className="text-right top-6">
                    <Popover className="relative">
                      <Popover.Button className="flex items-center">
                        <Image
                          src={user?.profileImageUrl}
                          alt={user?.name}
                          width={45}
                          height={45}
                          className="rounded-full"
                        />
                      </Popover.Button>
                      <Popover.Panel className="absolute right-0 z-10 mt-2 bg-white border rounded shadow-lg w-72">
                        <div className="flex flex-col text-left divide-y divide-neutral-light">
                          <a className="w-full px-4 py-2 cursor-pointer">
                            <div className="font-semibold text-md">
                              {user.name}
                            </div>
                            <div className="text-sm">@username</div>
                          </a>
                          <a
                            className="w-full px-4 py-2 cursor-pointer"
                            onClick={logout}
                          >
                            Logout
                          </a>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
