import clsx from 'classnames';

import styles from './styles.module.css';

export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className, ...rest }) => {
  return (
    <div {...rest} data-testid="modal-footer" className={clsx(className, styles.footer)}>
      {children}
    </div>
  );
};

export default ModalFooter;
