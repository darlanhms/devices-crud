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

const Input: React.FC<InputProps> = ({ error, className, fullWidth, ...rest }) => {
  const inputClasses = clsx(styles.input, className, {
    [styles.error]: error,
    [styles.fullWidth]: fullWidth,
  });

  return <input className={inputClasses} {...rest} />;
};

export default Input;
