import { DBFields } from "./dbfields";
import { M3Fields } from "./m3fields";
import { M2AFields } from './m2afields';
import { M2LFields } from "./m2lfields";


type DBFields<T extends string> = 
    T extends 'DESCRIPTION' ? M2AFields :
    T extends 'COLLECTIONS' ? M3Fields :
    T extends 'BIBLIO' ? M2LFields :
    never;
export interface Media {
	im: string[]
	im_access_link: string[]
}

export interface FieldData<T extends string> {
	[key: string]: string | number | DBFields<T> | FieldData[]
}
interface Record {
	media?: Media
	is_bookmarked: string
	database_name: string
	record_link: string
	record: FieldData
}
