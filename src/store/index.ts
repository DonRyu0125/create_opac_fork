import { GenericObject } from '@/lib/record';
import { atom } from 'jotai';

export type ViewType = 'grid' | 'list';
export const viewAtom = atom<ViewType>('grid');

export const pageData = atom<GenericObject | null>(null);
