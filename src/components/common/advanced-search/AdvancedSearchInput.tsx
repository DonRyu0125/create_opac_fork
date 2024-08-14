import { cn } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FieldObject } from './AdvancedSearchForm'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import AdvancedSearchIndexDialog from './AdvancedSearchIndexDialog'

interface AdvancedSearchInputProps {
	exp: FieldObject
	index: number
	database_name: string
	updateField: Function
	submitSearch: Function
}
export type selected = {
	label: string
	name: string
}

const AdvancedSearchInput = ({
	updateField,
	index,
	exp,
	database_name,
	submitSearch,
}: AdvancedSearchInputProps) => {
	const { advancedSearch, message } = useConstants()
	const [userSelect, setUserSelect] = useState<string>('')
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

	const searchDatabase = () => {
		let dbArr = advancedSearch.filter((elm) => elm.database === database_name)
		return dbArr[0]
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			submitSearch()
		}
	}

	const getLabel = () => {
		let item = searchDatabase().items.find((item) => item.name === exp.field)
		return item?.label
	}

	return (
		<div className="w-full flex relative m-2" key={index}>
			<Select
				value={exp.field}
				onValueChange={(value) => {
					updateField('field', value, index)
					setUserSelect(value)
				}}>
				<SelectTrigger className="w-52 border border-opac-green bg-opac-green text-white rounded-r-lg font-semibold text-left">
					<SelectValue
						className={'text-black'}
						placeholder={<div>{message.selectAfield}</div>}
					/>
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
				value={exp.keyword}
				onChange={(e) => {
					updateField('keyword', e.target.value, index)
				}}
				className={cn(
					'placeholder:text-slate-400 border w-full rounded-none pl-4 border-2 py-3 bg-transparent border-opac-green focus:outline-none ring-inset'
				)}
				type="search"
			/>
			{!exp.keyword && (
				<div
					className={
						'absolute w-full h-full flex items-center justify-center text-gray-500 pointer-events-none'
					}>
					<span className="hidden lg:inline ml-[15px] text-gray-500 italic">
						{message.searchPlaceholder}
						{getLabel()}
					</span>
				</div>
			)}
			<Select
				value={exp.boolean}
				onValueChange={(value) => {
					updateField('boolean', value, index)
				}}>
				<SelectTrigger
					disabled={!exp.boolean}
					className="w-28 border border-opac-green bg-opac-green text-white rounded-l-lg font-semibold ">
					<SelectValue />
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
			<AdvancedSearchIndexDialog
				label={getLabel()}
				field={exp.field ?? userSelect}
				updateField={updateField}
				adv_search_index={index}
				database_name={database_name}
			/>
		</div>
	)
}

export default AdvancedSearchInput
