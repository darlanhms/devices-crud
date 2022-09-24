import clsx from 'classnames';

import styles from './styles.module.css';

export type FormControlProps = React.HTMLAttributes<HTMLDivElement>;

const FormControl: React.FC<FormControlProps> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={clsx(styles.formControl, className)}>
      {children}
    </div>
  );
};

export default FormControl;
