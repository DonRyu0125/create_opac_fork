import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fields from '@/schema/styles.json'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import { default as enValues } from '@/constants/en/styles.json'
import { default as frValues } from '@/constants/fr/styles.json'
import { SchemaType } from '@/types/schema'
import TabsWrapper from '@/components/common/admin/layout/TabsWrapper'
import { TabsContent } from '@radix-ui/react-tabs'
import { useAdminForm } from '@/hooks/useAdminForm'
import Select from '@/components/common/admin/input/Select'
import themeOptions from '@/themes/index.json'
const AdminStyles = () => {
	return (
		<AdminLayout>
			<TabsWrapper>
				<TabsContent value="en">
					<AdminFormProvider
						data={enValues}
						schema={fields as SchemaType}
						filepath="constants/en/styles.json">
						<AdminForm>
							<Form lang="en" />
						</AdminForm>
					</AdminFormProvider>
				</TabsContent>
				<TabsContent value="fr">
					<AdminFormProvider
						data={frValues}
						schema={fields as SchemaType}
						filepath="constants/fr/styles.json">
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

	const options = themeOptions.map((e) => ({ value: e, label: e }))

	return (
		<div className="flex gap-4 flex-col">
			<Select
				label="Site theme"
				placeholder="Select a theme"
				defaultValue={fieldsValue.theme}
				options={options}
				onChange={(e) => handleChange(['theme'], e.value)}
			/>
		</div>
	)
}
export default AdminStyles
