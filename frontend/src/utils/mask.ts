import { isNumber } from './validations';

export const DEFAULT_MASK_CHAR = '_';

export const DEFAULT_FORMAT_CHAR = '#';

/**
 * Gets all indexes that have a formatChar to be replaced by input value
 */
export const mapMaskCharIndexes = (format: string, formatChar = DEFAULT_FORMAT_CHAR): Array<number> => {
  return format
    .split('')
    .map((char, index) => ({ char, index }))
    .filter(({ char }) => char === formatChar)
    .map(({ index }) => index);
};

/**
 * replace format chars to mask chars to use it as input value
 */
export const replaceFormatChars = (
  format: string,
  formatChar = DEFAULT_FORMAT_CHAR,
  maskChar = DEFAULT_MASK_CHAR,
): string => {
  return format.replace(new RegExp(formatChar, 'g'), maskChar);
};

/**
 * Used to know if user is typing a valid char or number and not 'Esc' or 'Backspace' or an accent
 */
export const isCharOrNumber = (value: string): boolean => {
  return value.length === 1 && !!value.match(/[0-9]|[a-z]|[A-Z]/g);
};

/**
 * Uses mask index mapping and current input value to find next mask char index
 */
export const nextMaskCharIndex = (
  currentIndex: number,
  maskIndexMap: Array<number>,
  currentValue: string,
  maskChar = DEFAULT_MASK_CHAR,
): number | undefined => {
  const nextIndex = maskIndexMap.find(index => index > currentIndex);

  if (!isNumber(nextIndex)) {
    return nextIndex;
  }

  /**
   * if next index is not a maskChar, try to find another one
   */
  if (currentValue[nextIndex] !== maskChar) {
    return nextMaskCharIndex(nextIndex, maskIndexMap, currentValue, maskChar);
  }

  return nextIndex;
};

/**
 * Useful on backspace inputs, finds previous mask index but does not consider current input value
 */
export const prevMaskCharIndex = (currentIndex: number, maskIndexMap: Array<number>): number | undefined => {
  return [...maskIndexMap].reverse().find(index => index < currentIndex);
};

export const isMaskSlot = (index: number, maskIndexMap: Array<number>): boolean => {
  return maskIndexMap.includes(index);
};

/**
 * applies char to current value on informed index validating if it's a valid mask slot
 */
export const applyCharToMask = (
  currentValue: string,
  char: string,
  index: number,
  maskIndexMap: Array<number>,
): string => {
  if (isMaskSlot(index, maskIndexMap)) {
    const splitValue = currentValue.split('');
    splitValue[index] = char;

    return splitValue.join('');
  }

  return currentValue;
};

/**
 * {@link applyCharToMask} opposite
 */
export const applyMaskToChar = (
  currentValue: string,
  index: number,
  maskChar = DEFAULT_MASK_CHAR,
  maskIndexMap: Array<number>,
): string => {
  if (isMaskSlot(index, maskIndexMap)) {
    const splitValue = currentValue.split('');
    splitValue[index] = maskChar;

    return splitValue.join('');
  }

  return currentValue;
};

/**
 * Changes input caret position for desired `pos` value
 */
export const changeInputSelection = (el: HTMLInputElement, pos: number): void => {
  el.focus();
  el.setSelectionRange(pos, pos);
};

export const isDeletionKey = (key: string): boolean => {
  return key === 'Backspace';
};

export const isSelectionKey = (key: string): boolean => {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'End', 'Home', 'Control'].includes(key);
};
