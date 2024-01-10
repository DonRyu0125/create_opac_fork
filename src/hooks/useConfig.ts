import config from '@/constants/config.json';

/**
 * Ensure type-safe for config
 * @returns
 */
export const useConfig = (): typeof config => {
  return config;
};
