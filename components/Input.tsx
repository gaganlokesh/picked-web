import classNames from 'classnames';
import { forwardRef } from 'react';

type InputProps = {
  type: 'text';
  isInvalid?: boolean;
} & JSX.IntrinsicElements['input'];

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isInvalid, ...rest } = props;
  const inputProps = {
    ...rest,
    'aria-invalid': props.isInvalid || undefined,
  };

  const className = classNames('rounded', props.className, {
    'border-danger ring-danger focus:border-danger focus:ring-danger':
      props.isInvalid,
  });

  return (
    <input
      {...(inputProps as JSX.IntrinsicElements['input'])}
      ref={ref}
      className={className}
    />
  );
});

Input.displayName = 'Input';

export default Input;
