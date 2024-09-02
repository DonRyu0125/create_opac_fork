import {
	Select as DefaultSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

const Select = (props: SelectProps) => {
	return (
		<DefaultSelect {...props}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">Light</SelectItem>
				<SelectItem value="dark">Dark</SelectItem>
				<SelectItem value="system">System</SelectItem>
			</SelectContent>
		</DefaultSelect>
	)
}

export default Select
