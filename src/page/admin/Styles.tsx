import AdminForm from '@/components/common/admin/form/AdminForm'
import AdminLayout from '@/components/layouts/admin'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'
import { default as enValues } from '@/constants/en/styles.json'
import { useAdminForm } from '@/hooks/useAdminForm'
import { AdminFormProvider } from '@/providers/AdminFormProvider'
import fields from '@/schema/home.json'
import { SchemaType } from '@/types/schema'
type StyleSchema = typeof enValues
const AdminStyles = () => {
	return (
		<AdminLayout>
			<AdminFormProvider
				data={enValues}
				schema={fields as SchemaType}
				filepath="constants/en/styles.json">
				<AdminForm>
					<ThemePicker data={enValues} />
				</AdminForm>
			</AdminFormProvider>
		</AdminLayout>
	)
}

const ThemePicker = ({ data }: { data: StyleSchema }) => {
	const { handleChange } = useAdminForm()
	const themes = [
		{
			id: 'opac',
			label: 'Ocean Breeze',
			value: 'opac',
			colors: {
				header: 'bg-[#1B365D]',
				body: 'bg-[#8794B0]',
				footer: 'bg-[#1B365D]/90',
				buttonPrimary: 'bg-white',
				buttonSecondary: 'bg-[#1B365D]',
			},
		},
		{
			id: 'nature',
			label: 'Forest Glow',
			value: 'nature',
			colors: {
				header: 'bg-emerald-800',
				body: 'bg-emerald-600',
				footer: 'bg-emerald-800/90',
				buttonPrimary: 'bg-white',
				buttonSecondary: 'bg-emerald-700',
			},
		},
		{
			id: 'nord',
			label: 'Monochrome Elegance',
			value: 'nord',
			colors: {
				header: 'bg-blue-500',
				body: 'bg-gray-500',
				footer: 'bg-blue-200/90',
				buttonPrimary: 'bg-white',
				buttonSecondary: 'bg-gray-800',
			},
		},
		{
			id: 'netflix',
			label: 'Crimson Flame',
			value: 'netflix',
			colors: {
				header: 'bg-black',
				body: 'bg-grey-800',
				footer: 'bg-red-900/90',
				buttonPrimary: 'bg-white',
				buttonSecondary: 'bg-red-800',
			},
		},
	]
	return (
		<div className=" mx-auto">
			<h2 className="text-2xl font-semibold mb-6">Theme Settings</h2>
			<RadioGroup
				defaultValue={data.theme}
				className="grid grid-cols-2 gap-6"
				onValueChange={(value) => {
					handleChange(['theme'], value)
				}}>
				{themes.map((theme) => (
					<div key={theme.id} className="space-y-2">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value={theme.value} id={theme.id} />
							<Label htmlFor={theme.id}>{theme.label}</Label>
						</div>
						<Card className="overflow-hidden">
							<CardContent className="p-0">
								<div className={`${theme.colors.header} p-3`}>
									<div className="flex justify-between items-center">
										<Skeleton className="h-6 w-32 bg-white/20" />
										<Skeleton className="h-6 w-16 bg-white/20" />
									</div>
								</div>
								<div className={`${theme.colors.body} p-2`}>
									<div className="flex space-x-2">
										{[1, 2, 3, 4].map((i) => (
											<Skeleton key={i} className="h-4 w-12 bg-white/20" />
										))}
									</div>
								</div>
								<div className={`${theme.colors.footer} p-4`}>
									<Skeleton className="h-5 w-48 mx-auto mb-3 bg-white/20" />
									<div className="flex gap-2">
										<Skeleton
											className={`h-8 flex-1 ${theme.colors.buttonPrimary}`}
										/>
										<Skeleton
											className={`h-8 w-20 ${theme.colors.buttonSecondary}`}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				))}
			</RadioGroup>
		</div>
	)
}
export default AdminStyles
