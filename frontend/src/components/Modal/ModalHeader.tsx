import clsx from 'classnames';
import useModal from '../../hooks/useModal';
import Button from '../Button';

import styles from './styles.module.css';

export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className, ...rest }) => {
  const { onClose } = useModal();

  return (
    <div {...rest} data-testid="modal-header" className={clsx(styles.header, className)}>
      <div>{children}</div>

      <Button
        data-testid="modal-close-button"
        className={styles.closeButton}
        variant="transparent"
        onClick={onClose}
      >
        X
      </Button>
    </div>
  );
};

export default ModalHeader;
