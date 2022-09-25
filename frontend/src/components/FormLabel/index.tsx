import clsx from 'classnames';

import styles from './styles.module.css';

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const FormLabel: React.FC<FormLabelProps> = ({ children, className, ...rest }) => {
  return (
    <label {...rest} className={clsx(styles.label, className)}>
      {children}
    </label>
  );
};

export default FormLabel;
