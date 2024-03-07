export interface Media {
	im: string[]
	im_access_link: string[]
}

export interface FieldData {
	[key: string]: string | number | FieldData | FieldData[]
}

interface Record {
	media?: Media
	is_bookmarked: string
	database_name: string
	record_link: string
	record: FieldData
}
