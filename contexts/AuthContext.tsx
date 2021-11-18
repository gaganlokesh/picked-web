import { useRouter } from 'next/router';
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';
import { getAccessToken, refreshAccessToken, revokeToken } from '../api/auth';
import { getLoggedInUser } from '../api/user';
import { githubSigninPopup, googleSigninPopup } from '../lib/auth';
import { OAuthProvider } from '../types/auth';
import { User } from '../types/user';

interface AuthContextData {
  /** Logged-in user instance */
  user: User;
  /** The "initial" token request has completed and login state is known */
  isReady: boolean;
  /** New user login process has started and the OAuth handshake is in-progress */
  isLoading: boolean;
  isLoggedIn: boolean;
  shouldOpenLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loginWithGithub: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextData>(null);

// prettier-ignore
const TOKEN_REFRESH_INTERVAL = ((30 * 60) - 10) * 1000;

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const router = useRouter();

  const [user, setUser] = useState<User>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [shouldOpenLoginModal, setShouldOpenLoginModal] =
    useState<boolean>(false);

  const { mutate: refreshAuth } = useSWR(
    'refresh_token',
    () => {
      /**
       * TODO: Both `isLoggedIn` and `isReady` state updates should be batched to avoid re-renders.
       * Upgrading to React 18 should fix this.(https://github.com/reactwg/react-18/discussions/21)
       */
      return refreshAccessToken()
        .then(() => setIsLoggedIn(true))
        .finally(() => setIsReady(true));
    },
    {
      shouldRetryOnError: false,
      refreshInterval: TOKEN_REFRESH_INTERVAL,
    }
  );

  const { data: userData } = useSWR<User>(
    isLoggedIn ? '/users/me' : null,
    getLoggedInUser
  );

  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleFirebaseAuthResponse = useCallback(
    (provider: OAuthProvider, token: string) => {
      // Request access token from API server using Firebase auth credential
      return getAccessToken(provider, token)
        .then((tokenResponse) => {
          setIsLoggedIn(true);

          // Set timer to refresh access token before it expires
          setTimeout(refreshAuth, tokenResponse.expiresIn * 1000);
        })
        .catch((err) => console.error(err));
    },
    [refreshAuth]
  );

  const loginWithGithub = useCallback(() => {
    setIsLoading(true);

    return githubSigninPopup()
      .then((res) => handleFirebaseAuthResponse('github', res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [handleFirebaseAuthResponse]);

  const loginWithGoogle = useCallback(() => {
    setIsLoading(true);

    return googleSigninPopup()
      .then((res) => handleFirebaseAuthResponse('google', res))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, [handleFirebaseAuthResponse]);

  const logout = useCallback(() => {
    return revokeToken()
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);

        router.reload();
      })
      .catch((err) => console.error(err));
  }, [router]);

  const value: AuthContextData = useMemo(
    () => ({
      user,
      isReady,
      isLoading,
      isLoggedIn,
      shouldOpenLoginModal,
      openLoginModal: () => setShouldOpenLoginModal(true),
      closeLoginModal: () => setShouldOpenLoginModal(false),
      loginWithGithub,
      loginWithGoogle,
      logout,
    }),
    [
      user,
      isReady,
      isLoading,
      isLoggedIn,
      shouldOpenLoginModal,
      loginWithGithub,
      loginWithGoogle,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  return context;
};
