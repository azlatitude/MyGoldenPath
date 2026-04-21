import * as Linking from 'expo-linking';

export const APP_SCHEME = 'mygoldenpath';

export const parseMonthParam = (value?: string) => {
  if (!value) return undefined;
  return /^\d{4}-\d{2}$/.test(value) ? value : undefined;
};

export const buildUrl = (path: string) => Linking.createURL(path);
