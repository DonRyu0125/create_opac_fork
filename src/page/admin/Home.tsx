import AdminForm from '@/components/common/admin/AdminForm'
import TextField from '@/components/common/admin/input/TextField'
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
				<AdminForm>
					<TextField
						title={''}
						value={''}
						onChange={function (value: string): void {
							throw new Error('Function not implemented.')
						}}
					/>
				</AdminForm>
			</AdminFormProvider>
		</AdminLayout>
	)
}

export default AdminHome
