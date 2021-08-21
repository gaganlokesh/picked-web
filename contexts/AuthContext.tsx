import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { login, logout, githubSigninPopup, googleSigninPopup } from "../lib/auth";
import firebase from "../lib/firebase";
import { OAuthProvider } from "../types/auth";

interface AuthContextData {
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

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [shouldOpenLoginModal, setShouldOpenLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (!!window.localStorage.getItem("accessToken")) {
      setIsLoggedIn(true);
    }
  }, [])

  const handleAuthResponse = useCallback(
    (provider: OAuthProvider, res: firebase.auth.UserCredential) => {
      const credential = res.credential as firebase.auth.OAuthCredential;
      return login(provider, credential.accessToken)
        .then(() => setIsLoggedIn(true));
    },
    [setIsLoggedIn]
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

  const logoutFn = () => {
    return logout()
      .then(() => setIsLoggedIn(false));
  }

  const value = useMemo(
    () => ({
      isLoggedIn,
      shouldOpenLoginModal,
      openLoginModal: () => setShouldOpenLoginModal(true),
      closeLoginModal: () => setShouldOpenLoginModal(false),
      loginWithGithub,
      loginWithGoogle,
      logout: logoutFn,
    }),
    [
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
