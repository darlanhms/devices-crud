import clsx from 'classnames';

import styles from './styles.module.css';

export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;

const ModalBody: React.FC<ModalBodyProps> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={clsx(className, styles.body)}>
      {children}
    </div>
  );
};

export default ModalBody;
