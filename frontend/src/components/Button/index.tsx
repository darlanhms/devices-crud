import clsx from 'classnames';
import styles from './styles.module.css';

export type ButtonVariant = 'primary' | 'error' | 'success';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={clsx(styles.common, className, {
        [styles.error]: variant === 'error',
        [styles.success]: variant === 'success',
      })}
    >
      {children}
    </button>
  );
};

export default Button;
