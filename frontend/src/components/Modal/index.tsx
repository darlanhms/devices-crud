import type { HTMLAttributes, FC } from 'react';
import clsx from 'classnames';
import { ModalProvider } from '../../hooks/useModal';

import styles from './styles.module.css';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose(): void;
}

interface ModalComponent extends FC<ModalProps> {
  Header: FC<HTMLAttributes<HTMLDivElement>>;
  Title: FC<HTMLAttributes<HTMLHeadingElement>>;
  Body: FC<HTMLAttributes<HTMLDivElement>>;
  Footer: FC<HTMLAttributes<HTMLDivElement>>;
}

const Modal: ModalComponent = ({ open, onClose, children, className, ...rest }) => {
  if (open) {
    return (
      <ModalProvider onClose={onClose}>
        <div className={styles.overlay}>
          <div {...rest} className={clsx(styles.modal, className)}>
            {children}
          </div>
        </div>
      </ModalProvider>
    );
  }

  return <></>;
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
