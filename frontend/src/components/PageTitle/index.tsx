import clsx from 'classnames';
import styles from './styles.module.css';

type PageTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const PageTitle: React.FC<PageTitleProps> = ({ children, className, ...props }) => {
  return (
    <h3 className={clsx(styles.title, className)} {...props}>
      {children}
    </h3>
  );
};

export default PageTitle;
