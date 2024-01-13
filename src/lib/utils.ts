import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ensure type-safe for config
 * @returns
 */
export const getTypeJSON = <T>(json: T): typeof json => {
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
