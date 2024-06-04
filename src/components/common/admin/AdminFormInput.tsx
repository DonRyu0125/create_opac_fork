import React from 'react'
import { Input } from '../../ui/input'
import { Checkbox } from '../../ui/checkbox'
import { Label } from '@/components/ui/label'
import { SchemaType } from '@/types/schema'
import { TEXTAREA_LENGTH } from '@/lib/admin'
import { Textarea } from '@/components/ui/textarea'

const AdminFormInput = ({ type, title, items, properties, value }: SchemaType) => {
	console.log({ type, title, properties, value })
	if (type === 'string') {
		try {
			const stringValue = JSON.stringify(value).replace(/"/g, '')
			const inputId = `${title.split(' ').join('')}-input`
			return (
				<div className="my-3">
					<Label className="font-bold" htmlFor={inputId}>
						{title}
					</Label>
					{stringValue.length >= TEXTAREA_LENGTH ? (
						<Textarea id={inputId} placeholder={title} defaultValue={stringValue} />
					) : (
						<Input id={inputId} placeholder={title} defaultValue={stringValue} />
					)}
				</div>
			)
		} catch (error) {
			console.error('Error rendering string input')
		}
	}
	if (type === 'boolean') return <Checkbox />
	if (type === 'array') {
		return ''
	}
	if (type === 'object' && properties) {
		return Object.keys(properties).map((e) => {
			const item = properties[e] as SchemaType
			const itemValue = value && (value[e] as Record<string, Object>)
			if (item) {
				const { type, title, value, ...rest } = item
				return <AdminFormInput value={itemValue} type={type} title={title} {...rest} />
			}
			return null
		})
	}

	return <div>Unhandled data type</div>
}

export default AdminFormInput
