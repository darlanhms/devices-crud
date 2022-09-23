/* eslint-disable react/display-name */
import { FC, PropsWithChildren, HTMLAttributes } from 'react';
import clsx from 'classnames';

import styles from './styles.module.css';

export interface TableComponent extends FC<PropsWithChildren> {
  Container: FC<HTMLAttributes<HTMLDivElement>>;
  Body: FC<HTMLAttributes<HTMLDivElement>>;
  Head: FC<HTMLAttributes<HTMLDivElement>>;
  Row: FC<HTMLAttributes<HTMLDivElement>>;
  Th: FC<HTMLAttributes<HTMLDivElement>>;
  Td: FC<HTMLAttributes<HTMLDivElement>>;
}

const Table: TableComponent = ({ children, ...rest }) => {
  return (
    <table className={styles.table} {...rest}>
      {children}
    </table>
  );
};

Table.Container = ({ children, className, ...rest }) => {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};

Table.Row = ({ children }) => {
  return <tr>{children}</tr>;
};

/**
 * Head components
 */
Table.Head = ({ children }) => {
  return <thead>{children}</thead>;
};

Table.Th = ({ children }) => {
  return <th className={clsx(styles.th, styles.cell)}>{children}</th>;
};

/**
 * Body components
 */
Table.Body = ({ children }) => {
  return <tbody>{children}</tbody>;
};

Table.Td = ({ children }) => {
  return <td className={clsx(styles.td, styles.cell)}>{children}</td>;
};

export default Table;
