import { atom } from 'jotai';

export type ViewType = 'grid' | 'list';
export const viewAtom = atom<ViewType>('grid');

export type PageDataType = unknown | null;
export const pageData = atom<PageDataType>(null);

export const setPageDataAtom = (value) => atom<PageDataType>(value);
