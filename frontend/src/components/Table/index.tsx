/* eslint-disable react/display-name */
import { FC, PropsWithChildren } from 'react';
import clsx from 'classnames';

import styles from './styles.module.css';

export interface TableComponent extends FC<PropsWithChildren> {
  Container: FC<PropsWithChildren>;
  Body: FC<PropsWithChildren>;
  Head: FC<PropsWithChildren>;
  Row: FC<PropsWithChildren>;
  Th: FC<PropsWithChildren>;
  Td: FC<PropsWithChildren>;
}

const Table: TableComponent = ({ children }) => {
  return <table className={styles.table}>{children}</table>;
};

Table.Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
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
