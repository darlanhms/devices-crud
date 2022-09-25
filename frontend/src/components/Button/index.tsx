import clsx from 'classnames';
import styles from './styles.module.css';

export type ButtonVariant = 'primary' | 'error' | 'success' | 'transparent';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...rest }) => {
  return (
    <button {...rest} className={clsx(styles.button, className, styles[variant])}>
      {children}
    </button>
  );
};

export default Button;
