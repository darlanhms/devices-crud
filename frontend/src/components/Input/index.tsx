import clsx from 'classnames';
import styles from './styles.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input borders and helper text become red
   */
  error?: boolean;
  /**
   * Helper text below input
   */
  helperText?: string;
  /**
   * Text label on top of input
   */
  label?: string;
  /**
   * Makes input full width
   */
  fullWidth?: boolean;
  /**
   * Add additional div container props
   */
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Add additional label props
   */
  labelProps?: React.HTMLAttributes<HTMLLabelElement>;
}

const Input: React.FC<InputProps> = ({
  error,
  helperText,
  className,
  containerProps,
  label,
  labelProps,
  fullWidth,
  ...rest
}) => {
  const inputClasses = clsx(styles.common, className, {
    [styles.error]: error,
    [styles.fullWidth]: fullWidth,
  });

  const helperTextClasses = clsx(styles.helperText, {
    [styles.error]: error,
  });

  const labelClasses = clsx(styles.label, labelProps?.className);

  return (
    <div {...containerProps}>
      {label && (
        <label {...labelProps} className={labelClasses}>
          {label}
        </label>
      )}
      <input className={inputClasses} {...rest} />
      {helperText && <p className={helperTextClasses}>{helperText}</p>}
    </div>
  );
};

export default Input;
