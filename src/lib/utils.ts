import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensure type-safe for config
 * @returns
 */
export const getJSONType = <T>(json: T): typeof json => {
  return json;
};

/**
 * Copy text to clipboard
 * @param text
 */
export const copyToClipboard = (text: string): void => {
  try {
    Promise.resolve(navigator.clipboard.writeText(text));
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

/**
 *
 * @param text original string
 * @param maxLength maximum number of chars
 * @param appendText text to be appened after truncation
 * @returns truncated word
 */
export const truncateWords = (
  text: string,
  maxLength: number = 20,
  appendText: string = '...'
): string => {
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}${appendText}`;
};

type GenericObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export function deepSearchKey<T extends GenericObject>(
  obj: T,
  targetKey: string
): unknown[] {
  const result: unknown[] = [];

  function search(obj: GenericObject, targetKey: string) {
    for (const key in obj) {
      if (key === targetKey) {
        result.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        search(obj[key], targetKey);
      }
    }
  }

  search(obj, targetKey);
  return result;
}


