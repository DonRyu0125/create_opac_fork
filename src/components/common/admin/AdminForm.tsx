import AdminFormInput from '@/components/common/admin/AdminFormInput'
import { SchemaType, SchemaValueType } from '@/types/schema'
type Props = {
	schema: SchemaType
	data: SchemaValueType
}

const AdminForm = ({ schema, data }: Props) => {
	const { $schema, type, title, properties, items } = schema
	return (
		<div className="flex col-span-3 flex-col space-y-3 min-w-[500px] w-full max-w-6xl">
			<AdminFormInput
				value={data}
				type={type}
				title={title}
				properties={properties}
				items={items}
			/>
		</div>
	)
}

export default AdminForm
