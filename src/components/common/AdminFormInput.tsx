import React from 'react'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'

type Props = {
	type: string
	title: string
}

const AdminFormInput = ({ type, title }: Props) => {
	if (type === 'string') return <Input placeholder={title} />
	if (type === 'boolean') return <Checkbox />

	return <div>AdminFormInput</div>
}

export default AdminFormInput
