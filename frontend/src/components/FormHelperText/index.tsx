import clsx from 'classnames';

import styles from './styles.module.css';

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: boolean;
}

const FormHelperText: React.FC<FormHelperTextProps> = ({ children, className, error, ...rest }) => {
  return (
    <p {...rest} className={clsx(styles.helperText, className, { [styles.error]: error })}>
      {children}
    </p>
  );
};

export default FormHelperText;
