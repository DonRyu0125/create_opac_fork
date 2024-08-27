export type InputProps = {
	id?: string
	title: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

export type CheckboxProps = {
	title: string
	value: boolean
	onChange: (value: boolean) => void
}
