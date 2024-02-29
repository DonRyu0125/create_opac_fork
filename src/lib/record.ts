

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
