// AdminFormProvider.tsx
import React, { createContext, useState, useCallback } from 'react'
import { axios } from '@/lib/axios'
import { addJsonValue, updateJsonValue } from '@/lib/admin'
import { SchemaType, SchemaValueType } from '@/types/schema'

type AdminFormContextType = {
	formData: SchemaValueType
	handleChange: (path: string[], newValue: SchemaValueType) => void
	handleAdd: (path: string[], newValue: SchemaValueType) => void
	handleRemove: (path: string[], index: number) => void
	handleFormSave: () => void
	schema: SchemaType
	duplicateItem: (path: string[], index: number) => void
}

const AdminFormContext = createContext<AdminFormContextType | undefined>(undefined)

type AdminFormProviderProps = {
	children: React.ReactNode
	schema: SchemaType
	data: SchemaValueType
	filepath: string
}

export const AdminFormProvider: React.FC<AdminFormProviderProps> = ({
	children,
	schema: defaultSchema,
	data,
	filepath,
}) => {
	const [formData, setFormData] = useState<SchemaValueType>(data)

	const [schema] = useState<SchemaType>(defaultSchema)

	const handleChange = useCallback((path: string[], newValue: SchemaValueType) => {
		setFormData((prevData) => updateJsonValue(prevData, path, newValue))
	}, [])

	const handleAdd = useCallback((path: string[], newValue: SchemaValueType) => {
		setFormData((prevData) => {
			const newData = addJsonValue(prevData, path, newValue)
			updateData(newData)
			return newData
		})
	}, [])

	const updateData = useCallback(
		(data: SchemaValueType) => {
			axios
				.post('/update', {
					path: filepath,
					content: JSON.stringify(data),
				})
				.then((res) => {
					console.log(res)
				})
		},
		[filepath]
	)

	const handleFormSave = useCallback(() => {
		updateData(formData)
	}, [formData, updateData])

	const handleItemDuplicate = useCallback((path: string[], index: number) => {
		setFormData((prevData) => {
			let targetArray = prevData
			path.forEach((e) => {
				if (
					targetArray &&
					typeof targetArray === 'object' &&
					!Array.isArray(targetArray) &&
					targetArray !== null
				) {
					targetArray = targetArray[e] as SchemaValueType
				}
			})

			// Perform the duplication
			if (Array.isArray(targetArray) && index >= 0 && index < targetArray.length) {
				const newArray = [...targetArray]
				newArray.splice(index, 0, targetArray[index])
				const newData = updateJsonValue(prevData, path, newArray)
				updateData(newData)
				return newData
			}

			return prevData
		})

		handleFormSave()
	}, [])

	const handleRemove = useCallback((path: string[], index: number) => {
		setFormData((prevData) => {
			let targetArray = prevData

			// Traverse through the path to get to the target array
			path.forEach((key) => {
				if (
					targetArray &&
					typeof targetArray === 'object' &&
					!Array.isArray(targetArray) &&
					targetArray !== null
				) {
					targetArray = targetArray[key] as SchemaValueType
				}
			})

			// Check if the target is an array and the index is valid
			if (Array.isArray(targetArray) && index >= 0 && index < targetArray.length) {
				// Remove the item from the array
				const newArray = [...targetArray]
				newArray.splice(index, 1)

				// Update the formData with the new array
				const newData = updateJsonValue(prevData, path, newArray)
				updateData(newData)
				return newData
			}

			// Return previous data if the removal operation is invalid
			return prevData
		})
	}, [])

	const contextValue = {
		formData,
		schema,
		handleChange,
		handleFormSave,
		duplicateItem: handleItemDuplicate,
		handleAdd,
		handleRemove,
	}

	return <AdminFormContext.Provider value={contextValue}>{children}</AdminFormContext.Provider>
}

export { AdminFormContext }
