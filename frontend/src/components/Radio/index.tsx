import React, { forwardRef } from 'react';
import clsx from 'classnames';
import { HStack } from '../Stack';
import styles from './styles.module.css';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, className, ...rest }, ref) => {
  return (
    <label>
      <HStack spacing={0.5}>
        <input ref={ref} type="radio" className={clsx(className, styles.radio)} {...rest} />
        {label && <p>{label}</p>}
      </HStack>
    </label>
  );
});

export default Radio;
