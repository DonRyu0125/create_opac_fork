import AdminFormInput from '@/components/common/admin/AdminFormInput'
import { Button } from '@/components/ui/button'
import { useAdminForm } from '@/hooks/useAdminForm'

const AdminForm = () => {
	const { formData, handleChange, handleFormSave, schema } = useAdminForm()
	const { type, title, properties, items } = schema

	return (
		<div className="flex col-span-3 flex-row  space-x-4 min-w-[500px] w-full max-w-6xl">
			<div className="w-full">
				<AdminFormInput
					value={formData}
					type={type}
					title={title}
					properties={properties}
					items={items}
					onChange={handleChange}
				/>
			</div>

			<div className="w-44 h-full sticky top-10 items-end">
				<Button className="" onClick={() => handleFormSave()}>
					Save changes
				</Button>
			</div>
		</div>
	)
}

export default AdminForm
