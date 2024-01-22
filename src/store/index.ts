import { atom } from "jotai";

export type ViewType = "grid" | "list";
export const viewAtom = atom<ViewType>("grid");
