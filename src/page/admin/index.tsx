import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import messageValue from '@/constants/en/message.json'
import message from '@/schema/message.json'
import { SchemaType } from '@/types/schema'

const Admin = () => {
	return (
		<AdminLayout>
			<AdminForm data={messageValue} schema={message as SchemaType} />
		</AdminLayout>
	)
}

export default Admin
