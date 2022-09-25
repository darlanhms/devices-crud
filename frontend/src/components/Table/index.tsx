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

Table.Row = ({ children, className, ...rest }) => {
  return (
    <tr {...rest} className={clsx(className, styles.row)}>
      {children}
    </tr>
  );
};

/**
 * Head components
 */
Table.Head = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};

Table.Th = ({ children, className, ...rest }) => {
  return (
    <th {...rest} className={clsx(styles.th, styles.cell, className)}>
      {children}
    </th>
  );
};

/**
 * Body components
 */
Table.Body = ({ children, ...rest }) => {
  return <tbody {...rest}>{children}</tbody>;
};

Table.Td = ({ children, className, ...rest }) => {
  return (
    <td {...rest} className={clsx(styles.td, styles.cell, className)}>
      {children}
    </td>
  );
};

export default Table;
