import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'solid' | 'outline';
  color?: 'primary' | 'neutral';
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
    styles.btn,
    {
      [styles['btn-primary']]: variant === 'solid' && color === 'primary',
      [styles['btn-primary-outline']]:
        variant === 'outline' && color === 'primary',
      [styles['btn-neutral']]: variant === 'solid' && color === 'neutral',
      [styles['btn-neutral-outline']]:
        variant === 'outline' && color === 'neutral',
    },
    className
  );

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

export default Button;
