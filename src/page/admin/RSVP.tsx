import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/en/rsvp.json'
import fields from '@/schema/rsvp.json'
import { SchemaType } from '@/types/schema'

const AdminRSVP = () => {
	return (
		<AdminLayout>
			<AdminForm
				data={fieldsValue}
				schema={fields as SchemaType}
				filepath="constants/en/rsvp.json"
			/>
		</AdminLayout>
	)
}

export default AdminRSVP
