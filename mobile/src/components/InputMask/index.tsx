/* eslint-disable no-continue */
import { useState } from 'react';
import noop from '../../utils/noop';
import FormInput, { FormInputProps } from '../FormInput';

const DEFAULT_FORMAT_CHAR = '#';

export interface InputMaskProps extends FormInputProps {
  /**
   * Formatted string using `#` (or `formatChar` value) where input will replace with characters
   * @example "(##) ####-####"
   */
  format: string;
  /**
   * Char that will be considered as a future input value on format string
   *
   * default: {@link DEFAULT_FORMAT_CHAR}
   */
  formatChar?: string;
}

interface MaskMap {
  char: string;
  mayBeReplaced: boolean;
}

/**
 * If it is a format char returns something like this:
 * ```js
 * {
 *   char: "#",
 *   mayBeReplaced: true,
 * }
 * ```
 *
 * If it is a mask char returns something like this:
 * ```js
 * {
 *   char: "(",
 *   mayBeReplaced: false,
 * }
 * ```
 *
 * `mayBeReplaced` will be used by input impl to know where to put user typed values
 */
export const mapMaskCharIndexes = (format: string, formatChar = DEFAULT_FORMAT_CHAR): Array<MaskMap> => {
  return format.split('').map(char => ({
    char,
    mayBeReplaced: Boolean(char.match(new RegExp(formatChar, 'i'))),
  }));
};

/**
 * On RN mask approach has to be different, mask chars are added as user types
 *
 * On the other hand, it is a much smaller implementation then web version
 */
const InputMask: React.FC<InputMaskProps> = ({ format, formatChar, onChangeText = noop, ...rest }) => {
  const [value, setValue] = useState<string>('');
  const maskMap = mapMaskCharIndexes(format, formatChar);

  const getDisplayValue = () => {
    let result = '';
    let maskCharIndex = 0;
    let valueCharIndex = 0;

    while (maskCharIndex < maskMap.length && valueCharIndex < value.length) {
      const currentSlot = maskMap[maskCharIndex];
      const valueChar = value[valueCharIndex];

      if (currentSlot.mayBeReplaced) {
        result += valueChar;
        valueCharIndex += 1;
      } else {
        result += currentSlot.char;
      }
      maskCharIndex += 1;
    }

    return result;
  };

  const handleChangeText = (text: string) => {
    setValue(text.replace(/[^a-z0-9]/gi, ''));

    onChangeText(getDisplayValue());
  };

  return <FormInput {...rest} onChangeText={handleChangeText} value={getDisplayValue()} />;
};

export default InputMask;
