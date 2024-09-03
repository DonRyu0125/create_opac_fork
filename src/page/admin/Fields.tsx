import AdminForm from '@/components/common/admin/AdminForm'
import CheckboxWithLabel from '@/components/common/admin/input/CheckboxWithLabel'
import TextField from '@/components/common/admin/input/TextField'
import SectionHeader from '@/components/common/admin/layout/SectionHeader'
import SectionWrapper from '@/components/common/admin/layout/SectionWrapper'
import TabsWrapper from '@/components/common/admin/layout/TabsWrapper'
import AdminLayout from '@/components/layouts/admin'
import { TabsContent } from '@/components/ui/tabs'
import enValues from '@/constants/en/fields.json'
import frValues from '@/constants/fr/fields.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/fields.json'
import { SchemaType } from '@/types/schema'

const Fields = () => {
	return (
		<AdminLayout>
			<TabsWrapper>
				<TabsContent value="en">
					<AdminFormProvider
						data={enValues}
						schema={fields as SchemaType}
						filepath="constants/en/fields.json">
						<AdminForm>
							<Form lang="en" />
						</AdminForm>
					</AdminFormProvider>
				</TabsContent>
				<TabsContent value="fr">
					<AdminFormProvider
						data={frValues}
						schema={fields as SchemaType}
						filepath="constants/fr/fields.json">
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
			{fieldsValue.map((db, dbIndex) => (
				<div>
					<SectionHeader heading={`${db.database} fields`} />
					<div className="flex flex-col gap-2">
						{db.items.map((item, itemIndex) => (
							<SectionWrapper key={JSON.stringify(item)}>
								<TextField
									title={'Field mnemonic'}
									value={item.name.toUpperCase()}
									onChange={(e) =>
										handleChange(
											[`${dbIndex}`, 'items', `${itemIndex}`, 'name'],
											e
										)
									}
								/>

								<TextField
									title={'Field label'}
									value={item.label}
									onChange={(e) =>
										handleChange(
											[`${dbIndex}`, 'items', `${itemIndex}`, 'label'],
											e
										)
									}
								/>

								<div className="flex flex-row gap-4">
									<CheckboxWithLabel
										title={'Summary report'}
										value={item.summary}
										onChange={(e) =>
											handleChange(
												[`${dbIndex}`, 'items', `${itemIndex}`, 'summary'],
												e
											)
										}
									/>

									<CheckboxWithLabel
										title={'Summary grid report'}
										value={item.grid}
										onChange={(e) =>
											handleChange(
												[`${dbIndex}`, 'items', `${itemIndex}`, 'grid'],
												e
											)
										}
									/>

									<CheckboxWithLabel
										title={'Detail report'}
										value={item.detail}
										onChange={(e) =>
											handleChange(
												[`${dbIndex}`, 'items', `${itemIndex}`, 'detail'],
												e
											)
										}
									/>
								</div>
							</SectionWrapper>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
export default Fields
