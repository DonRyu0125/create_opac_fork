import AdminFormInput from '@/components/common/admin/AdminFormInput'
import React from 'react'
import message from '@/schema/config.json'
import messageValue from '@/constants/en/config.json'
import { SchemaType } from '@/types/schema'
type Props = {}

const AdminForm = (props: Props) => {
	console.log({ message })

	const { $schema, type, title, properties, items } = message as SchemaType
	return (
		<div>
			<AdminFormInput
				value={messageValue}
				type={type}
				title={title}
				properties={properties}
				items={items}
			/>
		</div>
	)
}

export default AdminForm
