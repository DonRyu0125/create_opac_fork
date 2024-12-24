import AdminForm from '@/components/common/admin/form/AdminForm'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'
import AdminLayout from '@/components/layouts/admin'
import { default as enValues } from '@/constants/en/config.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'
const AdminSettings = () => {
	return (
		<AdminLayout>
			<AdminFormProvider
				data={enValues}
				schema={fields as SchemaType}
				filepath="constants/en/config.json">
				<AdminForm>
					<Form />
				</AdminForm>
			</AdminFormProvider>
		</AdminLayout>
	)
}

const Form = () => {
	const fieldsValue = enValues
	const { handleChange } = useAdminForm()

	return (
		<div className="flex gap-4 flex-col">
			<TextField
				title={'Site name'}
				value={fieldsValue.siteName}
				onChange={(e) => handleChange(['siteName'], e)}
			/>

			<div className="flex flex-col">
				<TextField
					title={'Site logo'}
					value={fieldsValue.logo}
					onChange={(e) => handleChange(['logo'], e)}
				/>
				<ImagePreview src={fieldsValue.logo} alt="Site Banner" />
			</div>
		</div>
	)
}
export default AdminSettings
