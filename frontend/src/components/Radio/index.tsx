import clsx from 'classnames';
import { HStack } from '../Stack';
import styles from './styles.module.css';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio: React.FC<RadioProps> = ({ label, className, ...rest }) => {
  return (
    <label>
      <HStack spacing={0.5}>
        <input type="radio" className={clsx(className, styles.radio)} {...rest} />
        {label && <p>{label}</p>}
      </HStack>
    </label>
  );
};

export default Radio;
