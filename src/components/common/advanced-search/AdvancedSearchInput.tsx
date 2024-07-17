import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import useConstants from '@/hooks/useConstants'
import { ChevronDownIcon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ADVANCED_SEARCH_BOOLEAN, FieldObject } from './AdvancedSearchForm'

interface AdvancedSearchInputProps {
	exp: FieldObject
	index: number
	database_name: string
	updateField: Function
}

const AdvancedSearchInput = ({
	updateField,
	index,
	exp,
	database_name,
}: AdvancedSearchInputProps) => {
	const { advancedSearch, message } = useConstants()

	const searchDatabase = () => {
		let dbArr = advancedSearch.filter((elm) => elm.database === database_name)
		return dbArr[0]
	}

	return (
		<div className="w-full flex relative m-2" key={index}>
			<Select
				onValueChange={(value) => {
					updateField('field', value, index)
				}}>
				<SelectTrigger className="w-72 border border-opac-green bg-opac-green text-white">
					<SelectValue
						className={'text-black'}
						placeholder={<div>{exp.field}</div>}
						defaultValue={''}
					/>
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{searchDatabase()?.items.map((item, key) => {
						return (
							<SelectItem
								key={key}
								value={item.name}
								className="w-46 border bg-opac-green border-opac-green ">
								{item.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
			<Input
				onChange={(e) => updateField('keyword', e.target.value, index)}
				className={cn(
					'w-full rounded-none pl-4 border-2 py-3 bg-transparent border-opac-green'
				)}
				placeholder={message.searchPlaceholder}
				type="search"
			/>

			<Select
				onValueChange={(value) => {
					updateField('boolean', value, index)
				}}>
				<SelectTrigger
					disabled={!exp.boolean}
					className="w-32 border border-opac-green bg-opac-green text-white">
					<SelectValue
						placeholder={ADVANCED_SEARCH_BOOLEAN.AND}
						defaultValue={exp.boolean ? exp.boolean : exp.boolean}
					/>
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{Object.values(ADVANCED_SEARCH_BOOLEAN).map((item, key) => {
						return (
							<SelectItem
								key={key}
								value={item}
								className="w-20 border border-opac-green bg-opac-green">
								{item}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
		</div>
	)
}

export default AdvancedSearchInput
