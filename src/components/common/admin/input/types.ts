import { ReactNode } from 'react'

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

type SelectOption = {
	value: string
	label: string
}

export type SelectProps = {
	label: string
	placeholder?: string
	triggerStyle?: string
	itemStyle?: string
	options: SelectOption[]
	onChange?: (option: SelectOption) => void
	defaultValue?: string
	renderOption?: (option: SelectOption) => ReactNode
}
