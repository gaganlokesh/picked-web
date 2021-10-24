import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';

interface SocialLoginProps {
  children: ReactNode;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

const SocialLoginButton = ({
  children,
  icon,
  onClick,
  className,
}: SocialLoginProps): ReactElement => {
  return (
    <button
      className={classNames(
        'w-full inline-flex py-2 border rounded-full justify-center items-center',
        className
      )}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span className="ml-4 font-semibold">{children}</span>
    </button>
  );
};

export default SocialLoginButton;
