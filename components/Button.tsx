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
  className,
  children,
  ...props
}: ButtonProps & JSX.IntrinsicElements['button']): ReactElement => {
  const classes = classNames(
    'py-2 px-4 text-sm rounded-full font-semibold',
    {
      'bg-primary text-white': variant === 'solid' && color === 'primary',
      'border border-primary text-primary':
        variant === 'outline' && color === 'primary',
    },
    className
  );

  return (
    <button {...props} className={classes}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
