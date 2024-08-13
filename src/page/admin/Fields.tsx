import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/en/fields.json'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/fields.json'
import { SchemaType } from '@/types/schema'

const Fields = () => {
	return (
		<AdminLayout>
			<AdminFormProvider
				data={fieldsValue}
				schema={fields as SchemaType}
				filepath="constants/en/fields.json">
				<AdminForm />
			</AdminFormProvider>
		</AdminLayout>
	)
}

export default Fields
