import { SchemaValueType } from '@/types/schema'

export const TEXTAREA_LENGTH = 50

export const updateJsonValue = (
	data: SchemaValueType,
	path: string[],
	newValue: SchemaValueType
): SchemaValueType => {
	if (path.length === 0) return newValue

	const [firstKey, ...restPath] = path

	if (Array.isArray(data)) {
		const index = parseInt(firstKey, 10)
		if (isNaN(index) || index < 0 || index >= data.length) {
			throw new Error('Invalid index')
		}
		return [
			...data.slice(0, index),
			updateJsonValue(data[index] as SchemaValueType, restPath, newValue),
			...data.slice(index + 1),
		] as SchemaValueType
	}

	if (data && typeof data === 'object') {
		const dataObject = data as Record<string, SchemaValueType>
		return {
			...dataObject,
			[firstKey]: updateJsonValue(dataObject[firstKey], restPath, newValue),
		} as SchemaValueType
	}

	// If `data` is neither an array nor an object, just return it
	return data
}
