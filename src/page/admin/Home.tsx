import AdminForm from '@/components/common/admin/AdminForm'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'
import SectionHeader from '@/components/common/admin/layout/SectionHeader'
import SectionWrapper from '@/components/common/admin/layout/SectionWrapper'
import TabsWrapper from '@/components/common/admin/layout/TabsWrapper'
import AdminLayout from '@/components/layouts/admin'
import { TabsContent } from '@/components/ui/tabs'
import { default as enValues } from '@/constants/en/home.json'
import { default as frValues } from '@/constants/fr/home.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'

const AdminHome = () => {
	return (
		<AdminLayout>
			<TabsWrapper>
				<TabsContent value="en">
					<AdminFormProvider
						data={enValues}
						schema={fields as SchemaType}
						filepath="constants/en/home.json">
						<AdminForm>
							<Form lang="en" />
						</AdminForm>
					</AdminFormProvider>
				</TabsContent>
				<TabsContent value="fr">
					<AdminFormProvider
						data={frValues}
						schema={fields as SchemaType}
						filepath="constants/fr/home.json">
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

			<div className="mt-2">
				<SectionHeader heading="Featured Collections" />
				<div className="flex flex-col gap-2">
					{fieldsValue.featuredCollection.map((item, index) => (
						<SectionWrapper key={JSON.stringify(item)}>
							<TextField
								title={'Category title'}
								value={item.title}
								onChange={(e) =>
									handleChange(['featuredCollection', `${index}`, 'title'], e)
								}
							/>

							<TextField
								title={'Search expression'}
								value={item.url}
								onChange={(e) =>
									handleChange(['featuredCollection', `${index}`, 'url'], e)
								}
							/>

							<TextField
								title={'Thumbnail'}
								value={item.thumbnail}
								onChange={(e) =>
									handleChange(['featuredCollection', `${index}`, 'thumbnail'], e)
								}
							/>

							<ImagePreview
								src={item.thumbnail}
								alt="Featured collection thumbnail"
							/>
						</SectionWrapper>
					))}{' '}
				</div>
			</div>
			<div className="mt-2">
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
			</div>
		</div>
	)
}
export default AdminHome
