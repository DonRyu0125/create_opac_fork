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

const AdvancedSearchInput = ({ updateField, index, exp }: any) => {
	const { advancedSearch, message } = useConstants()
	const [select, setSelect] = useState<string>('Select a field')
	return (
		<div className="w-full flex relative m-2" key={index}>
			<Select
				onValueChange={(e) => {
					setSelect(e)
				}}>
				<SelectTrigger className="w-72 border border-opac-green bg-opac-green text-white">
					<SelectValue className={'text-black'} placeholder={<div>{select}</div>} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{advancedSearch['DESCRIPTION_WEB']?.map((item) => {
						return (
							<SelectItem
								value={item.name}
								className="w-46 border bg-opac-green border-opac-green ">
								{item.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
			<Input
				className={cn(
					'w-full rounded-none pl-4 border-2 py-3 bg-transparent border-opac-green text-white '
				)}
				placeholder={message.searchPlaceholder}
				type="search"
			/>
			<Select
				onValueChange={(e) => {
					// setLanguage(e as LanguageCode)
				}}>
				<SelectTrigger className="w-32 border border-opac-green bg-opac-green text-white">
					<SelectValue placeholder={'And'} defaultValue={'And'} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					<SelectItem
						value={'And'}
						className="w-20 border border-opac-green bg-opac-green">
						And
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default AdvancedSearchInput
