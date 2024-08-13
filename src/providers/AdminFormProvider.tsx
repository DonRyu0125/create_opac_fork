// AdminFormProvider.tsx
import React, { createContext, useState, useCallback } from 'react'
import { axios } from '@/lib/axios'
import { updateJsonValue } from '@/lib/admin'
import { SchemaType, SchemaValueType } from '@/types/schema'

type AdminFormContextType = {
	formData: SchemaValueType
	handleChange: (path: string[], newValue: SchemaValueType) => void
	handleFormSave: () => void
	schema: SchemaType
	duplicateItem: (path: string[], index: number) => void
	removeItem: (path: string[], index: number) => void
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

	const handleItemRemove = useCallback((path: string[], index: number) => {
		setFormData((prevData) => {
			if (Array.isArray(prevData)) {
				const newValue = [...prevData]
				if (index >= 0 && index < prevData.length) {
					newValue.splice(index, 1)
				}
				return updateJsonValue(prevData, path, newValue)
			}
			return prevData // If not an array, return as is
		})
	}, [])

	const contextValue = {
		formData,
		schema,
		handleChange,
		handleFormSave,
		removeItem: handleItemRemove,
		duplicateItem: handleItemDuplicate,
	}

	return <AdminFormContext.Provider value={contextValue}>{children}</AdminFormContext.Provider>
}

export { AdminFormContext }
