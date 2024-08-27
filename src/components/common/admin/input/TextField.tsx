import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TEXTAREA_LENGTH } from '@/lib/admin'
import React, { useState } from 'react'
import { InputWrapper } from './InputWrapper'

type Props = {
	id?: string
	title: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

const TextField = ({ id, title, value, onChange, placeholder }: Props) => {
	const [val, setVal] = useState(value)
	const defaultId = id || `text-field-${title}`

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
	) => {
		setVal(e.target.value)

		onChange?.(e.target.value)
	}
	return (
		<InputWrapper label={title} id={defaultId}>
			{value.length >= TEXTAREA_LENGTH ? (
				<Textarea
					aria-placeholder={placeholder}
					id={defaultId}
					placeholder={title}
					defaultValue={val}
					onChange={handleChange}
				/>
			) : (
				<Input
					aria-placeholder={placeholder}
					id={defaultId}
					placeholder={title}
					defaultValue={value}
					onChange={handleChange}
				/>
			)}
		</InputWrapper>
	)
}

export default TextField
