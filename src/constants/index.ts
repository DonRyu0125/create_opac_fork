import configjson from "./config.json";
import homejson from "./home.json";
import themejson from "@/themes/index.json";
import stylesjson from "./styles.json";
import faqjson from "./faq.json";
type Type<T> = {
  [K in keyof T]: T[K];
};

const config: Type<typeof configjson> = configjson;
const home: Type<typeof homejson> = homejson;
const theme: Type<typeof themejson> = themejson;
const styles: Type<typeof stylesjson> = stylesjson;
const faq: Type<typeof faqjson> = faqjson;

export { config, home, theme, styles, faq };
