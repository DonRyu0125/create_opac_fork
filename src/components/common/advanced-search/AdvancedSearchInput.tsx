import { cn } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ADVANCED_SEARCH_BOOLEAN, FieldObject } from './AdvancedSearchForm'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

interface AdvancedSearchInputProps {
	exp: FieldObject
	index: number
	database_name: string
	updateField: Function
	submitSearch: Function
}
const AdvancedSearchInput = ({
	updateField,
	index,
	exp,
	database_name,
	submitSearch,
}: AdvancedSearchInputProps) => {
	const { advancedSearch, message } = useConstants()
	const [text, setText] = useState<string>()
	const ADVANCED_SEARCH_BOOLEAN_SELECT_MAP = [
		{
			key: `${message.and}`,
			value: 'AND',
		},
		{
			key: `${message.or}`,
			value: 'OR',
		},
		{
			key: `${message.not}`,
			value: 'AND NOT',
		},
	]

	useEffect(() => {
		setText('')
	}, [])

	const searchDatabase = () => {
		let dbArr = advancedSearch.filter((elm) => elm.database === database_name)
		return dbArr[0]
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			submitSearch()
		}
	}

	return (
		<div className="w-full flex relative m-2" key={index}>
			<Select
				onValueChange={(value) => {
					updateField('field', value, index)
				}}>
				<SelectTrigger className="w-52 border border-opac-green bg-opac-green text-white rounded-r-lg font-semibold text-left">
					<SelectValue className={'text-black'} placeholder={<div>{message.selectAfield}</div>} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{searchDatabase()?.items.map((item, key) => {
						return (
							<SelectItem
								key={key}
								value={item.name}
								className="w-full border bg-opac-green border-opac-green ">
								{item.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
			<Input
				onKeyDown={handleKeyDown}
				value={text}
				onChange={(e) => {
					updateField('keyword', e.target.value, index)
					setText(e.target.value)
				}}
				className={cn(
					'placeholder:text-slate-400 border w-full rounded-none pl-4 border-2 py-3 bg-transparent border-opac-green focus:outline-none ring-inset'
				)}
				type="search"
			/>
			{!text && (
				<div
					className={
						'absolute w-full h-full flex items-center justify-center text-gray-500 pointer-events-none'
					}>
					<span className="hidden lg:inline ml-[15px] text-gray-500">
						{message.searchPlaceholder}
					</span>
				</div>
			)}
			<Select
				onValueChange={(value) => {
					updateField('boolean', value, index)
				}}>
				<SelectTrigger
					disabled={!exp.boolean}
					className="w-28  border border-opac-green bg-opac-green text-white rounded-l-lg font-semibold ">
					<SelectValue
						placeholder={message.and}
						defaultValue={exp.boolean ? exp.boolean : exp.boolean}
					/>
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{ADVANCED_SEARCH_BOOLEAN_SELECT_MAP.map((item, key) => {
						return (
							<SelectItem
								key={key}
								value={item.value}
								className="w-full border border-opac-green bg-opac-green">
								{item.key}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
		</div>
	)
}

export default AdvancedSearchInput
