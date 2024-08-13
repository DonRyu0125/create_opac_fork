import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/en/home.json'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'

const AdminHome = () => {
	return (
		<AdminLayout>
			<AdminFormProvider
				data={fieldsValue}
				schema={fields as SchemaType}
				filepath="constants/en/home.json">
				<AdminForm />
			</AdminFormProvider>
		</AdminLayout>
	)
}

export default AdminHome
