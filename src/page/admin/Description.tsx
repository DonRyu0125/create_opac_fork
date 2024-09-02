import AdminForm from '@/components/common/admin/AdminForm'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'
import TabsWrapper from '@/components/common/admin/layout/TabsWrapper'
import AdminLayout from '@/components/layouts/admin'
import { TabsContent } from '@/components/ui/tabs'
import { default as enValues } from '@/constants/en/museum.json'
import { default as frValues } from '@/constants/fr/museum.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'

const AdminDescription = () => {
	return (
		<AdminLayout>
			<TabsWrapper>
				<TabsContent value="en">
					<AdminFormProvider
						data={enValues}
						schema={fields as SchemaType}
						filepath="constants/en/museum.json">
						<AdminForm>
							<Form lang="en" />
						</AdminForm>
					</AdminFormProvider>
				</TabsContent>
				<TabsContent value="fr">
					<AdminFormProvider
						data={frValues}
						schema={fields as SchemaType}
						filepath="constants/fr/museum.json">
						<AdminForm>
							<Form lang="fr" />
						</AdminForm>
					</AdminFormProvider>
				</TabsContent>
			</TabsWrapper>
		</AdminLayout>
	)
}

const Form = ({ lang }: { lang: 'en' | 'fr' }) => {
	const fieldsValue = lang === 'en' ? enValues : frValues
	const { handleChange } = useAdminForm()

	return (
		<div className="flex gap-4 flex-col">
			<TextField
				title={'Page heading'}
				value={fieldsValue.heading}
				onChange={(e) => handleChange(['heading'], e)}
			/>

			<div className="flex flex-col">
				<TextField
					title={'Site banner'}
					value={fieldsValue.heroBanner}
					onChange={(e) => handleChange(['heroBanner'], e)}
				/>
				<ImagePreview src={fieldsValue.heroBanner} alt="Site Banner" />
			</div>
		</div>
	)
}
export default AdminDescription
