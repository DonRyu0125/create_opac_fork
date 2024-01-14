import configjson from './config.json';
import homejson from './home.json';

type Type<T> = {
  [K in keyof T]: T[K];
};

export type TConfig = Type<typeof configjson>;
export type THome = Type<typeof homejson>;

const config: TConfig = configjson;
const home: THome = homejson;

export { config, home };
