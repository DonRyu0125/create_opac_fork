import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/en/message.json'
import fields from '@/schema/message.json'
import { SchemaType } from '@/types/schema'

const AdminMessage = () => {
	return (
		<AdminLayout>
			<AdminForm
				data={fieldsValue}
				schema={fields as SchemaType}
				filepath="constants/en/message.json"
			/>
		</AdminLayout>
	)
}

export default AdminMessage
