import { Button } from '@/components/ui/button'
import { useAdminForm } from '@/hooks/useAdminForm'
import { ReactNode } from 'react'

const AdminForm = ({ children }: { children?: ReactNode }) => {
	const { handleFormSave } = useAdminForm()

	return (
		<div className="flex col-span-3 flex-row  space-x-4 min-w-[500px] w-full max-w-6xl mx-auto">
			<div className="w-full">{children}</div>

			<div className="w-44 h-full sticky top-0 items-end p-4">
				<Button className="" onClick={() => handleFormSave()}>
					Save changes
				</Button>
			</div>
		</div>
	)
}

export default AdminForm
