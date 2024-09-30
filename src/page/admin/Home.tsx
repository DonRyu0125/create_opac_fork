import AdminFormLayout from '@/components/common/admin/AdminFormLayout'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'
import SectionActions from '@/components/common/admin/layout/SectionActions'
import SectionHeader from '@/components/common/admin/layout/SectionHeader'
import SectionWrapper from '@/components/common/admin/layout/SectionWrapper'
import { Button } from '@/components/ui/button'
import { default as enValues } from '@/constants/en/home.json'
import { default as frValues } from '@/constants/fr/home.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'
import { Trash } from 'lucide-react'

const AdminHome = () => {
	return (
		<AdminFormLayout
			enData={enValues}
			frData={frValues}
			schema={fields as SchemaType}
			enFilepath={'constants/en/home.json'}
			frFilepath={'constants/fr/home.json'}
			FormComponent={Form}
		/>
	)
}

const Form = ({ lang }: { lang: 'en' | 'fr' }) => {
	const fieldsValue = lang === 'en' ? enValues : frValues
	const { handleChange, handleAdd, handleRemove } = useAdminForm()

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

				<SectionActions
					onAddNew={() => {
						handleAdd(
							['featuredCollection', `${fieldsValue.featuredCollection.length}`],
							{
								title: '',
								description: '',
								url: '',
								thumbnail: '',
							}
						)
					}}
					enableFeatureValue={fieldsValue.enableFeaturedCollection}
					onEnableFeatureChange={(e) => {
						handleChange(['enableFeaturedCollection'], e)
					}}
				/>

				{fieldsValue.enableFeaturedCollection && (
					<div className="flex flex-col gap-2">
						{fieldsValue.featuredCollection.map((item, index) => (
							<SectionWrapper
								key={JSON.stringify(item)}
								onRemove={() => {
									handleRemove(['featuredCollection'], index)
								}}>
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
										handleChange(
											['featuredCollection', `${index}`, 'thumbnail'],
											e
										)
									}
								/>

								<ImagePreview
									src={item.thumbnail}
									alt="Featured collection thumbnail"
								/>
							</SectionWrapper>
						))}{' '}
					</div>
				)}
			</div>
			<div className="mt-2">
				<SectionHeader heading="Browse By Category" />
				<SectionActions
					onAddNew={() => {
						handleAdd(['categoriesItems', `${fieldsValue.categoriesItems.length}`], {
							title: '',
							url: '',
							thumbnail: '',
						})
					}}
					enableFeatureValue={fieldsValue.enableCategoriesItems}
					onEnableFeatureChange={(e) => {
						handleChange(['enableCategoriesItems'], e)
					}}
				/>

				{fieldsValue.enableCategoriesItems && (
					<div className="flex flex-col gap-2">
						{fieldsValue.categoriesItems.map((item, index) => (
							<SectionWrapper
								key={JSON.stringify(item)}
								onRemove={() => {
									handleRemove(['categoriesItems'], index)
								}}>
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
										handleChange(
											['categoriesItems', `${index}`, 'thumbnail'],
											e
										)
									}
								/>

								<ImagePreview src={item.thumbnail} alt="Category thumbnail" />
							</SectionWrapper>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
export default AdminHome
