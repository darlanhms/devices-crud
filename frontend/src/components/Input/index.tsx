import React from 'react';
import clsx from 'classnames';
import styles from './styles.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input borders and helper text become red
   */
  error?: boolean;
  /**
   * Makes input full width
   */
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, fullWidth, ...rest }, ref) => {
    const inputClasses = clsx(styles.input, className, {
      [styles.error]: error,
      [styles.fullWidth]: fullWidth,
    });

    return <input ref={ref} className={inputClasses} {...rest} />;
  },
);

export default Input;
