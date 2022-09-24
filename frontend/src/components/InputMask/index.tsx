/* eslint-disable no-plusplus */
import React from 'react';
import {
  applyCharToMask,
  applyMaskToChar,
  changeInputSelection,
  isCharOrNumber,
  isDeletionKey,
  isSelectionKey,
  mapMaskCharIndexes,
  nextMaskCharIndex,
  prevMaskCharIndex,
  replaceFormatChars,
  DEFAULT_FORMAT_CHAR,
  DEFAULT_MASK_CHAR,
} from '../../utils/mask';
import { isNumber } from '../../utils/validations';
import Input from '../Input';

export interface InputMaskProps {
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
  /**
   * Value that input will replace with characters
   *
   * default: {@link DEFAULT_MASK_CHAR}
   */
  maskChar?: string;
}

const InputMask: React.FC<InputMaskProps> = ({
  format,
  maskChar = DEFAULT_MASK_CHAR,
  formatChar = DEFAULT_FORMAT_CHAR,
}) => {
  const maskIndexes = mapMaskCharIndexes(format, formatChar);
  const maskStr = replaceFormatChars(format, formatChar, maskChar);

  /**
   * - If input value is empty set it to mask value
   * - Always change selection position to the next possible mask char input
   */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      e.target.value = maskStr;
    }

    setTimeout(() => {
      // if next char is undefined it means that selection is at the end of input
      const nextCharIndex = nextMaskCharIndex(-1, maskIndexes, e.target.value, maskChar) ?? format.length;

      changeInputSelection(e.target, nextCharIndex);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { selectionStart, selectionEnd } = target;
    const { key } = e;

    const isKeyValid = isCharOrNumber(key) || isDeletionKey(key);

    if (!isNumber(selectionStart) || !isNumber(selectionEnd) || !isKeyValid) {
      // don't prevent default on selection keys to make it possible to user to change manually the input selection
      if (!isSelectionKey(key)) {
        e.preventDefault();
      }
      return;
    }

    // handle new valid char input
    if (isCharOrNumber(key)) {
      e.preventDefault();

      target.value = applyCharToMask(target.value, key, selectionEnd, maskIndexes);

      const nextIndex = nextMaskCharIndex(selectionEnd, maskIndexes, target.value, maskChar);

      if (isNumber(nextIndex)) {
        changeInputSelection(target, nextIndex);
      }
    } else if (isDeletionKey(key)) {
      e.preventDefault();

      // simple deletion
      if (selectionStart === selectionEnd) {
        const prevIndex = prevMaskCharIndex(selectionEnd, maskIndexes);

        if (isNumber(prevIndex)) {
          target.value = applyMaskToChar(target.value, prevIndex, maskChar, maskIndexes);

          changeInputSelection(target, prevIndex);
        }
      } else {
        // handle delete a multi value selection
        for (let currentPos = selectionEnd; currentPos > selectionStart; currentPos--) {
          const prevIndex = prevMaskCharIndex(currentPos, maskIndexes);

          if (isNumber(prevIndex)) {
            target.value = applyMaskToChar(target.value, prevIndex, maskChar, maskIndexes);

            changeInputSelection(target, prevIndex);
          }
        }
      }
    }
  };

  return <Input onFocus={handleFocus} onKeyDown={handleKeyDown} />;
};

export default InputMask;