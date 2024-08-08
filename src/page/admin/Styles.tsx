import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/fr/styles.json'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/styles.json'
import { SchemaType } from '@/types/schema'

const AdminStyles = () => {
	return (
		<AdminLayout>
			<AdminFormProvider
				data={fieldsValue}
				schema={fields as SchemaType}
				filepath="constants/fr/styles.json">
				<AdminForm />
			</AdminFormProvider>
		</AdminLayout>
	)
}

export default AdminStyles
