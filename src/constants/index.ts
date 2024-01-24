import configjson from "./config.json";
import homejson from "./home.json";
import themejson from "@/themes/index.json";
import stylesjson from "./styles.json";
type Type<T> = {
  [K in keyof T]: T[K];
};

const config: Type<typeof configjson> = configjson;
const home: Type<typeof homejson> = homejson;
const theme: Type<typeof themejson> = themejson;
const styles: Type<typeof stylesjson> = stylesjson;

export { config, home, theme, styles };
