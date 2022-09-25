import React, { forwardRef } from 'react';
import clsx from 'classnames';
import styles from './styles.module.css';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, value, className, ...rest }, ref) => {
  return (
    <label>
      <input {...rest} className={clsx(styles.radio, className)} ref={ref} type="radio" value={value} />
      {label || ''}
    </label>
  );
});

export default Radio;
