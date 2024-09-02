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

export type SelectProps = {
	placeholder?: string
	triggerStyle?: string
	itemStyle?: string
	options: {
		value: string
		label: string
	}[]
	defaultValue?: string
	renderOption?: (option: { value: string; label: string }) => ReactNode
}
