import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fieldsValue from '@/constants/en/fields.json'
import fields from '@/schema/fields.json'
import { SchemaType } from '@/types/schema'

const Fields = () => {
	return (
		<AdminLayout>
			<AdminForm data={fieldsValue} schema={fields as SchemaType} />
		</AdminLayout>
	)
}

export default Fields
