import { Switch as SwitchUI } from '@/components/ui/switch'
import { InputWrapper } from './InputWrapper'
import { SwitchProps } from './types'
const Switch = ({ title, value, onChange }: SwitchProps) => {
	return (
		<InputWrapper
			className="flex-row-reverse items-center justify-end gap-x-2 space-y-0"
			label={title}>
			<SwitchUI
				onCheckedChange={(e) => onChange(Boolean(e))}
				className="mt-0"
				defaultChecked={Boolean(value)}
				id={`switch-${title.toLowerCase()}`}
			/>
		</InputWrapper>
	)
}

export default Switch
