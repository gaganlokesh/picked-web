import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { login, logout } from "../lib/auth";
import { OAuthProvider } from "../types/auth";

interface AuthContextData {
  isLoggedIn: boolean;
  shouldOpenLoginModal: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (provider: OAuthProvider, token: string) => Promise<void>;
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

  const loginFn = (provider: OAuthProvider, token: string) => {
    return login(provider, token).then(res => setIsLoggedIn(true));
  }

  const logoutFn = () => {
    return logout().then(res => setIsLoggedIn(false));
  }

  const value = useMemo(
    () => ({
      isLoggedIn,
      shouldOpenLoginModal,
      openLoginModal: () => setShouldOpenLoginModal(true),
      closeLoginModal: () => setShouldOpenLoginModal(false),
      login: loginFn,
      logout: logoutFn,
    }),
    [
      isLoggedIn,
      shouldOpenLoginModal
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
