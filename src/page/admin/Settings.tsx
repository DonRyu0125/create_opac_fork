import AdminForm from '@/components/common/admin/AdminForm'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'
import TabsWrapper from '@/components/common/admin/layout/TabsWrapper'
import AdminLayout from '@/components/layouts/admin'
import { TabsContent } from '@/components/ui/tabs'
import { default as enValues } from '@/constants/en/config.json'
import { default as frValues } from '@/constants/fr/config.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'

const AdminSettings = () => {
	return (
		<AdminLayout>
			<TabsWrapper>
				<TabsContent value="en">
					<AdminFormProvider
						data={enValues}
						schema={fields as SchemaType}
						filepath="constants/en/config.json">
						<AdminForm>
							<Form lang="en" />
						</AdminForm>
					</AdminFormProvider>
				</TabsContent>
				<TabsContent value="fr">
					<AdminFormProvider
						data={frValues}
						schema={fields as SchemaType}
						filepath="constants/fr/config.json">
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

			{/* <div className="mt-2">
				<SectionHeader heading="Browse By Category" />
				<div className="flex flex-col gap-2">
					{fieldsValue.categoriesItems.map((item, index) => (
						<SectionWrapper key={JSON.stringify(item)}>
							<TextField
								title={'Category title'}
								value={item.title}
								onChange={(e) =>
									handleChange(['categoriesItems', `${index}`, 'title'], e)
								}
							/>

							<TextField
								title={'Search expression'}
								value={item.url}
								onChange={(e) =>
									handleChange(['categoriesItems', `${index}`, 'url'], e)
								}
							/>

							<TextField
								title={'Thumbnail'}
								value={item.thumbnail}
								onChange={(e) =>
									handleChange(['categoriesItems', `${index}`, 'thumbnail'], e)
								}
							/>

							<ImagePreview src={item.thumbnail} alt="Category thumbnail" />
						</SectionWrapper>
					))}{' '}
				</div>
			</div> */}
		</div>
	)
}
export default AdminSettings
