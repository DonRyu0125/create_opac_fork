import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/fr/styles.json'
import fields from '@/schema/styles.json'
import { SchemaType } from '@/types/schema'

const AdminStyles = () => {
	return (
		<AdminLayout>
			<AdminForm
				data={fieldsValue}
				schema={fields as SchemaType}
				filepath="constants/fr/styles.json"
			/>
		</AdminLayout>
	)
}

export default AdminStyles
