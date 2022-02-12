import { ReactElement, ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../Header';
import LoginModal from '../LoginModal';

const AppLayout = (children: ReactNode): ReactElement => {
  const { isLoggedIn, shouldOpenLoginModal, closeLoginModal } = useAuth();

  return (
    <>
      <Header />
      <div className="pt-16">{children}</div>
      {!isLoggedIn && (
        <LoginModal open={shouldOpenLoginModal} onClose={closeLoginModal} />
      )}
    </>
  );
};

export default AppLayout;
