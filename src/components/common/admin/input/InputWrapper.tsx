import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-select'

type InputWrapperProps = {
	children?: React.ReactNode
	id: string
	label?: string
	className?: string
}

export const InputWrapper = ({ children, id, label, className }: InputWrapperProps) => {
	return (
		<div className={cn('my-3 flex flex-col space-y-2', className)}>
			<Label className="font-bold">{label}</Label>
			{children}
		</div>
	)
}
