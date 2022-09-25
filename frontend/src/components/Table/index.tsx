/* eslint-disable react/display-name */
import { FC, HTMLAttributes } from 'react';
import clsx from 'classnames';

import styles from './styles.module.css';

export interface TableComponent extends FC<HTMLAttributes<HTMLTableElement>> {
  Container: FC<HTMLAttributes<HTMLDivElement>>;
  Body: FC<HTMLAttributes<HTMLDivElement>>;
  Head: FC<HTMLAttributes<HTMLDivElement>>;
  Row: FC<HTMLAttributes<HTMLDivElement>>;
  Th: FC<HTMLAttributes<HTMLDivElement>>;
  Td: FC<HTMLAttributes<HTMLDivElement>>;
}

const Table: TableComponent = ({ children, className, ...rest }) => {
  return (
    <table {...rest} data-testid="table" className={clsx(styles.table, className)}>
      {children}
    </table>
  );
};

Table.Container = ({ children, className, ...rest }) => {
  return (
    <div {...rest} data-testid="table-container" className={clsx(styles.container, className)}>
      {children}
    </div>
  );
};

Table.Row = ({ children, className, ...rest }) => {
  return (
    <tr {...rest} data-testid="table-row" className={clsx(className, styles.row)}>
      {children}
    </tr>
  );
};

/**
 * Head components
 */
Table.Head = ({ children, ...rest }) => {
  return (
    <thead {...rest} data-testid="table-head">
      {children}
    </thead>
  );
};

Table.Th = ({ children, className, ...rest }) => {
  return (
    <th {...rest} data-testid="table-th" className={clsx(styles.th, styles.cell, className)}>
      {children}
    </th>
  );
};

/**
 * Body components
 */
Table.Body = ({ children, ...rest }) => {
  return (
    <tbody {...rest} data-testid="table-body">
      {children}
    </tbody>
  );
};

Table.Td = ({ children, className, ...rest }) => {
  return (
    <td {...rest} data-testid="table-td" className={clsx(styles.td, styles.cell, className)}>
      {children}
    </td>
  );
};

export default Table;
