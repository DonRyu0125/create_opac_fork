import CheckboxWithLabel from '@/components/common/admin/input/CheckboxWithLabel'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'
import Dropdown from './Dropdown'

type FormFieldProps<T extends string | boolean> = {
	field: string
	type: 'text' | 'checkbox' | 'image' | 'list' // Limit type to specific values
	value: T // Value can be a string (for text/image) or boolean (for checkbox)
	onChange?: (value: T) => void // onChange handler type
	name?: string
}
// Component with props typing
const FormField = <T extends string | boolean>({
	field,
	type,
	value,
	onChange,
	name,
}: FormFieldProps<T>) => {
	switch (type) {
		case 'text':
			return (
				<TextField
					name={name}
					title={field}
					value={value as string}
					onChange={(e) => onChange?.(e as T)}
				/>
			)
		case 'checkbox':
			return (
				<CheckboxWithLabel
					title={field}
					value={value as boolean}
					onChange={(e) => onChange?.(e as T)}
				/>
			)
		case 'image':
			return (
				<div className="flex flex-col">
					<TextField
						name={name}
						title={field}
						value={value as string}
						onChange={(e) => onChange?.(e as T)}
					/>
					<ImagePreview src={value as string} alt={field} />
				</div>
			)

		case 'list':
			return <Dropdown />

		default:
			return 'Unsupported input type'
	}
}

export default FormField
