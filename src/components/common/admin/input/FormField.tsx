import CheckboxWithLabel from '@/components/common/admin/input/CheckboxWithLabel'
import ImagePreview from '@/components/common/admin/input/ImagePreview'
import TextField from '@/components/common/admin/input/TextField'

type FormFieldProps<T extends string | boolean> = {
	field: string
	type: 'text' | 'checkbox' | 'image' // Limit type to specific values
	value: T // Value can be a string (for text/image) or boolean (for checkbox)
	onChange: (value: T) => void // onChange handler type
}
// Component with props typing
const FormField = <T extends string | boolean>({
	field,
	type,
	value,
	onChange,
}: FormFieldProps<T>) => {
	switch (type) {
		case 'text':
			return (
				<TextField
					title={field}
					value={value as string}
					onChange={(e) => onChange(e as T)}
				/>
			)
		case 'checkbox':
			return (
				<CheckboxWithLabel
					title={field}
					value={value as boolean}
					onChange={(e) => onChange(e as T)}
				/>
			)
		case 'image':
			return (
				<>
					<TextField
						title={field}
						value={value as string}
						onChange={(e) => onChange(e as T)}
					/>
					<ImagePreview src={value as string} alt={field} />
				</>
			)
		default:
			return 'Unsupported input type'
	}
}

export default FormField
