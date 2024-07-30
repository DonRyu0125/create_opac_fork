import AdminFormInput from '@/components/common/admin/AdminFormInput'
import { Button } from '@/components/ui/button'
import { updateJsonValue } from '@/lib/admin'
import { axios } from '@/lib/axios'
import { SchemaType, SchemaValueType } from '@/types/schema'
import { useState } from 'react'
type Props = {
	schema: SchemaType
	data: SchemaValueType
	filepath: string
}

const AdminForm = ({ schema, data, filepath }: Props) => {
	const [formData, setFormData] = useState<SchemaValueType>(data)
	const { type, title, properties, items } = schema

	const handleChange = (path: string[], newValue: SchemaValueType) => {
		setFormData((prevData) => updateJsonValue(prevData, path, newValue))
	}

	const handleFormSave = () => {
		axios
			.post('/update', {
				path: filepath,
				content: JSON.stringify(formData),
			})
			.then((res) => {
				console.log(res)
			})
	}
	return (
		<div className="flex col-span-3 flex-row  space-x-4 min-w-[500px] w-full max-w-6xl">
			<div className="w-full">
				<AdminFormInput
					value={formData}
					type={type}
					title={title}
					properties={properties}
					items={items}
					onChange={handleChange}
				/>
			</div>

			<div className="w-44 h-full sticky top-10 items-end">
				<Button className="" onClick={handleFormSave}>
					Save changes
				</Button>
			</div>
		</div>
	)
}

export default AdminForm
