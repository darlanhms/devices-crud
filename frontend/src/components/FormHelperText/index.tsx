import clsx from 'classnames';

import styles from './styles.module.css';

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

const FormHelperText: React.FC<FormHelperTextProps> = ({ children, className, error, ...rest }) => {
  return (
    <label {...rest} className={clsx(styles.label, className, { [styles.error]: error })}>
      {children}
    </label>
  );
};

export default FormHelperText;
