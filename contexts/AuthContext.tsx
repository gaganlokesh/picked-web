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
import firebase from '../lib/firebase';
import { OAuthProvider } from '../types/auth';
import { User } from '../types/user';

interface AuthContextData {
  /** Logged-in user instance */
  user: User;
  /** The "initial" token request has completed and login state is known */
  isReady: boolean;
  /** The login process has started and the OAuth handshake is in-progress */
  loading: boolean;
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
  const [user, setUser] = useState<User>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [shouldOpenLoginModal, setShouldOpenLoginModal] =
    useState<boolean>(false);

  const { data: authData, mutate: refreshAuth } = useSWR(
    'refresh_token',
    () => refreshAccessToken().finally(() => setIsReady(true)),
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
    if (!isLoggedIn && authData?.accessToken) {
      setIsLoggedIn(true);
    }
  }, [authData]);

  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleFirebaseAuthResponse = useCallback(
    (provider: OAuthProvider, res: firebase.auth.UserCredential) => {
      const credential = res.credential as firebase.auth.OAuthCredential;

      // Request access token from API server using Firebase auth credential
      return getAccessToken(provider, credential.accessToken)
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
    setLoading(true);

    return githubSigninPopup()
      .then((res) => handleFirebaseAuthResponse('github', res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [handleFirebaseAuthResponse]);

  const loginWithGoogle = useCallback(() => {
    setLoading(true);

    return googleSigninPopup()
      .then((res) => handleFirebaseAuthResponse('google', res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [handleFirebaseAuthResponse]);

  const logout = () => {
    return revokeToken()
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((err) => console.error(err));
  };

  const value: AuthContextData = useMemo(
    () => ({
      user,
      isReady,
      loading,
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
      loading,
      isLoggedIn,
      shouldOpenLoginModal,
      loginWithGithub,
      loginWithGoogle,
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
