import clsx from 'classnames';
import styles from './styles.module.css';

export type StackDirection = 'row' | 'column';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Space between items
   *
   * @note Will be multiplied by 8
   */
  spacing?: number;
  /**
   * @default "row"
   */
  direction?: StackDirection;
}

const Stack: React.FC<StackProps> = ({ spacing, direction = 'row', style, children, className, ...rest }) => {
  const flexGap = spacing ? `${spacing * 8}px` : undefined;

  return (
    <div
      {...rest}
      data-testid="stack"
      style={{ gap: flexGap, ...style }}
      className={clsx(className, styles.stack, styles[direction])}
    >
      {children}
    </div>
  );
};

/**
 * Same as `Stack` but with column direction by default
 */
export const VStack: React.FC<Omit<StackProps, 'direction'>> = props => {
  return <Stack {...props} direction="column" />;
};

/**
 * Same as `Stack` but with row direction by default
 */
export const HStack: React.FC<Omit<StackProps, 'direction'>> = props => {
  return <Stack {...props} direction="row" />;
};

export default Stack;
