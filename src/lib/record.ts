import X2JS from 'x2js'
export const getRecordXML = (id: string) => {
	return document.querySelector(id) || null
}

export const getDataFromXML = (id: string) => {
	const xml = getRecordXML(id)

	if (xml) {
		try {
			const x2js = new X2JS({
				arrayAccessFormPaths: ['xml_record'],
			})

			const xmlString = new XMLSerializer().serializeToString(xml)
			const json = x2js.xml2js(xmlString) as GenericObject

			return json
		} catch (error) {
			console.log(error)
		}
	}

	return null
}

export type GenericObject = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export function deepSearchKey<T extends GenericObject>(
	obj: T,
	targetKey: string
): unknown[] | string[] {
	const result: unknown[] | string[] = []

	function search(obj: GenericObject, targetKey: string) {
		for (const key in obj) {
			if (key === targetKey) {
				result.push(obj[key])
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				search(obj[key], targetKey)
			}
		}
	}

	search(obj, targetKey)
	return result
}
