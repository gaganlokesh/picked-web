import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  variant?: 'solid' | 'outline';
  color?: 'primary';
  children: ReactNode;
}

const Button = ({
  variant = 'solid',
  color = 'primary',
  children,
  ...props
}: ButtonProps & JSX.IntrinsicElements['button']): ReactElement => {
  const className = classNames('py-2 px-5 text-sm rounded-full font-semibold', {
    'bg-primary text-white': variant === 'solid' && color === 'primary',
    'border border-primary text-primary':
      variant === 'outline' && color === 'primary',
  });

  return (
    <button {...props} className={className}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
