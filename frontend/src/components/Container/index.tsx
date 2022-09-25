import clsx from 'classnames';

import styles from './styles.module.css';

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({ children, className, ...rest }) => {
  return (
    <div data-testid="container" {...rest} className={clsx(styles.container, className)}>
      {children}
    </div>
  );
};

export default Container;
