import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type DropdownOption = {
	label: string
	value: string
}
export interface DropdownSelectProps {
	title?: string
	options: DropdownOption[]
}

const DropdownSelect = ({ title, options }: DropdownSelectProps) => {
	return (
		<div className="flex flex-col space-y-2">
			<Select>
				<SelectTrigger className="">
					<SelectValue placeholder={title || 'Select'} />
				</SelectTrigger>
				<SelectContent>
					{options?.length > 0 ? (
						options.map((option, i) => (
							<SelectItem key={i} value={option.value}>
								{option.label}
							</SelectItem>
						))
					) : (
						<SelectItem value="none">No options available</SelectItem>
					)}
				</SelectContent>
			</Select>
		</div>
	)
}

export default DropdownSelect
