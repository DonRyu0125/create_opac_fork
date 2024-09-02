import AdminForm from '@/components/common/admin/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import fields from '@/schema/styles.json'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import { default as enValues } from '@/constants/en/styles.json'
import { default as frValues } from '@/constants/fr/styles.json'
import { SchemaType } from '@/types/schema'
import TabsWrapper from '@/components/common/admin/layout/TabsWrapper'
import { TabsContent } from '@radix-ui/react-tabs'

const AdminStyles = () => {
	return (
		<AdminLayout>
			<TabsWrapper>
				<TabsContent value="en">
					<AdminFormProvider
						data={enValues}
						schema={fields as SchemaType}
						filepath="constants/en/styles.json">
						<AdminForm>{/* <HomeForm lang="en" /> */}</AdminForm>
					</AdminFormProvider>
				</TabsContent>
				<TabsContent value="fr">
					<AdminFormProvider
						data={frValues}
						schema={fields as SchemaType}
						filepath="constants/fr/styles.json">
						<AdminForm>{/* <HomeForm lang="fr" /> */}</AdminForm>
					</AdminFormProvider>
				</TabsContent>
			</TabsWrapper>
		</AdminLayout>
	)
}

export default AdminStyles
