import { Input } from '../../ui/input'
import { Checkbox } from '../../ui/checkbox'
import { Label } from '@/components/ui/label'
import { SchemaType, SchemaValueType } from '@/types/schema'
import { TEXTAREA_LENGTH } from '@/lib/admin'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import Toolbar from './Toolbar'
import useHover from '@/hooks/useHover'
import { ChangeEvent } from 'react'
import { useAdminForm } from '@/hooks/useAdminForm'

type InputWrapperProps = {
	children?: React.ReactNode
	id: string
	label?: string
	className?: string
}

const InputWrapper = ({ children, id, label, className }: InputWrapperProps) => {
	return (
		<div className={cn('my-3 flex flex-col space-y-2', className)}>
			<Label className="font-bold" htmlFor={id}>
				{label}
			</Label>
			{children}
		</div>
	)
}

const ArrayItemWrapper = ({
	children,
	onDuplicate,
	onRemove,
}: {
	children?: React.ReactNode
	onDuplicate: () => void
	onRemove: () => void
}) => {
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
	return (
		<div className="mx-2 my-4 border-2 border-black p-4 group relative" ref={hoverRef}>
			<Toolbar
				onDuplicate={onDuplicate}
				onRemove={onRemove}
				className={cn(isHovered ? 'opacity-100' : '', 'justify-end')}
			/>
			{children}
		</div>
	)
}

type AdminFormInputProps = SchemaType & {
	path?: string[]
	onChange: (path: string[], value: SchemaValueType) => void
}

const AdminFormInput = ({
	type,
	title,
	items,
	properties,
	value,
	path = [],
	onChange,
}: AdminFormInputProps) => {
	const { duplicateItem, removeItem } = useAdminForm()
	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (event.target.type === 'checkbox') {
			const v = (event as ChangeEvent<HTMLInputElement>).target.checked
			onChange(path, v)
		} else {
			onChange(path, event.target.value)
		}
	}

	if (type === 'string') {
		try {
			const stringValue = JSON.stringify(value).replace(/"/g, '')
			const inputId = `${title.split(' ').join('')}-input`
			return (
				<InputWrapper label={title} id={inputId}>
					{stringValue.length >= TEXTAREA_LENGTH ? (
						<Textarea
							id={inputId}
							placeholder={title}
							defaultValue={stringValue}
							onChange={handleChange}
						/>
					) : (
						<Input
							id={inputId}
							placeholder={title}
							defaultValue={stringValue}
							onChange={handleChange}
						/>
					)}
				</InputWrapper>
			)
		} catch (error) {
			console.error('Error rendering string input')
		}
	}
	if (type === 'boolean') {
		const inputId = `${title.split(' ').join('')}-input`
		return (
			<InputWrapper label={title} id={inputId}>
				<span>
					<Checkbox
						defaultChecked={Boolean(value)}
						onCheckedChange={(checked) => onChange(path, checked)}
					/>
				</span>
			</InputWrapper>
		)
	}
	if (type === 'array' && items) {
		return (value as Array<SchemaValueType>)?.map((v, i) => (
			<ArrayItemWrapper
				key={i}
				onDuplicate={() => duplicateItem(path, i)}
				onRemove={() => removeItem(path, i)}>
				<AdminFormInput value={v} {...items} path={[...path, `${i}`]} onChange={onChange} />
			</ArrayItemWrapper>
		))
	}
	if (type === 'object' && properties) {
		return Object.keys(properties).map((e) => {
			const item = properties[e] as SchemaType
			const itemValue = (value as Record<string, Object>)[e] as SchemaValueType

			const { type, title, value: dValue, ...rest } = item
			return (
				<AdminFormInput
					value={itemValue}
					type={type}
					title={title}
					path={[...path, e]}
					onChange={onChange}
					{...rest}
				/>
			)
		})
	}

	return <div>Unhandled data type</div>
}

export default AdminFormInput
