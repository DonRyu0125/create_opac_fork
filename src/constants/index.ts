import configjson from "./config.json";
import homejson from "./home.json";
import themejson from "@/themes/index.json";
type Type<T> = {
  [K in keyof T]: T[K];
};

export type TConfig = Type<typeof configjson>;
export type THome = Type<typeof homejson>;
export type TTheme = Type<typeof themejson>;

const config: TConfig = configjson;
const home: THome = homejson;
const theme: TTheme = themejson;

export { config, home, theme };
