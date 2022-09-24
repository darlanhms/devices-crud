/* eslint-disable import/prefer-default-export */

export const isNull = (value?: unknown): value is null => {
  return value === null;
};

export const isUndefined = (value?: unknown): value is undefined => {
  return value === undefined;
};

export const isNullOrUndefined = (value?: unknown): value is undefined | null => {
  return isUndefined(value) || isNull(value);
};

export const isNumber = (value?: unknown): value is number => {
  if (isNullOrUndefined(value) || value === '') {
    return false;
  }

  return !Number.isNaN(Number(value));
};
