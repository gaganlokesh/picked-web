import '../styles/globals.css'

import { ReactElement } from 'react'
import type { AppProps } from 'next/app'
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';

function Layout({ Component, pageProps }: AppProps): ReactElement {
  const {
    loading,
    isLoggedIn,
    shouldOpenLoginModal,
    openLoginModal,
    closeLoginModal,
    logout
  } = useAuth();

  return (
    <>
      <header>
        {!loading && !isLoggedIn && (
          <button
            className="text-md ml-auto uppercase"
            onClick={openLoginModal}
          >
            Login
          </button>
        )}
        {isLoggedIn && (
          <button
            className="text-md ml-auto uppercase"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </header>

      <Component {...pageProps} />

      {!isLoggedIn && (
        <LoginModal
          open={shouldOpenLoginModal}
          onClose={closeLoginModal}
        />
      )}
    </>
  )
}

function MyApp(props: AppProps): ReactElement {
  return (
    <AuthProvider>
      <Layout {...props} />
    </AuthProvider>
  )
}

export default MyApp
