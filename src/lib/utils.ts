import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
    console.error("Failed to copy: ", err);
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
  appendText: string = "...",
): string => {
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}${appendText}`;
};
