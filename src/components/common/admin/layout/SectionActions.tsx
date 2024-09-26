import React from 'react'
import Switch from '../input/Switch'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAdminForm } from '@/hooks/useAdminForm'

type Props = {
	enableFeatureValue: boolean
	onEnableFeatureChange: (e: boolean) => void
	onAddNew?: () => void
}

const SectionActions = ({ enableFeatureValue, onEnableFeatureChange, onAddNew }: Props) => {
	return (
		<div className="flex flex-row justify-between mt-2">
			<Switch
				title={'Enable feature'}
				value={enableFeatureValue}
				onChange={onEnableFeatureChange}
			/>
			{onAddNew && (
				<Button
					variant="outline"
					onClick={() => {
						onAddNew()
					}}>
					<Plus className="text-primary h-4 w-4 mr-1" />
					Add new
				</Button>
			)}
		</div>
	)
}

export default SectionActions
