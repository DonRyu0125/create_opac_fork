import { FieldsJson } from '@/types/fields.json'

import { fields } from '@/constants/index'
export type GenericObject = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export function deepSearchKey<T extends GenericObject>(obj: T, targetKey: string): string[] {
	const result: string[] = []

	function search(obj: GenericObject, targetKey: string) {
		for (const key in obj) {
			if (key.toLowerCase() === targetKey.toLowerCase()) {
				result.push(obj[key])
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				search(obj[key], targetKey)
			}
		}
	}

	search(obj, targetKey)
	return result
}

export const getListOfFields = (database: string) => {
	const databaseFields = (fields as FieldsJson).find((f) => f.database === database)
	return databaseFields
}
