import clsx from 'classnames';

import styles from './styles.module.css';

export type ModalTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className, ...rest }) => {
  return (
    <h4 {...rest} data-testid="modal-title" className={clsx(className, styles.title)}>
      {children}
    </h4>
  );
};

export default ModalTitle;
