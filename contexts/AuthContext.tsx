import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { getAccessToken, refreshAccessToken, revokeToken } from "../api/auth";
import { getLoggedInUser } from "../api/user";
import { githubSigninPopup, googleSigninPopup } from "../lib/auth";
import firebase from "../lib/firebase";
import { OAuthProvider } from "../types/auth";
import { User } from "../types/user";

interface AuthContextData {
  user: User;
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

const tokenTimeout = (expiresIn: number): number => (expiresIn - 10) * 1000;

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [shouldOpenLoginModal, setShouldOpenLoginModal] = useState<boolean>(false);

  const authRefreshTimer = useRef<NodeJS.Timeout>();

  const refreshAuth = useCallback(
    async (): Promise<void> => {
      try {
        const tokenResponse = await refreshAccessToken();
        setIsLoggedIn(true);

        clearTimeout(authRefreshTimer.current);
        authRefreshTimer.current = setTimeout(
          refreshAuth,
          tokenTimeout(tokenResponse.expiresIn)
        );
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
        setUser(null);
      }
    },
    []
  )

  useEffect(() => {
    refreshAuth();
  }, [])

  const handleAuthResponse = useCallback(
    (provider: OAuthProvider, res: firebase.auth.UserCredential) => {
      const credential = res.credential as firebase.auth.OAuthCredential;

      return getAccessToken(provider, credential.accessToken)
        .then(tokenResponse => {
          // Set timer to refresh access token before it expires
          authRefreshTimer.current = setTimeout(
            refreshAuth,
            tokenTimeout(tokenResponse.expiresIn)
          );

          return getLoggedInUser();
        })
        .then((user: User) => {
          setIsLoggedIn(true);
          setUser(user);
        })
        .catch(err => console.error(err));
    },
    [refreshAuth]
  )

  const loginWithGithub = useCallback(
    () => {
      return githubSigninPopup()
        .then(res => handleAuthResponse('github', res));
    },
    [handleAuthResponse]
  )

  const loginWithGoogle = useCallback(
    () => {
      return googleSigninPopup()
        .then(res => handleAuthResponse('google', res));
    },
    [handleAuthResponse]
  )

  const logout = () => {
    return revokeToken()
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
        clearTimeout(authRefreshTimer.current);
      })
      .catch(err => console.error(err))
    ;
  }

  const value: AuthContextData = useMemo(
    () => ({
      user,
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
      isLoggedIn,
      shouldOpenLoginModal,
      loginWithGithub,
      loginWithGoogle
    ]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }

  return context;
}
