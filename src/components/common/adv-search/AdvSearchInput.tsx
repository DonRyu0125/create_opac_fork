import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { SearchFormProps } from '../SearchForm'
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

const AdvSearchInput = ({updateField,index,exp}:any) => {
	const { message, advancedSearch } = useConstants()
	const [select, setSelect] = useState<string>('Select a field')
	return (
		<div className="w-full flex relative m-2" key={index}>
			<Select
				onValueChange={(e) => {
					setSelect(e)
				}}>
				<SelectTrigger className="w-72 border border-primary ">
					<SelectValue className={'text-black'} placeholder={<div>{select}</div>} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{advancedSearch.map((item) => {
						return (
							<SelectItem
								value={item.value}
								className="w-48 border border-primary bg-neutral-300 ">
								{item.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
			<Input
				className={cn(
					'w-full rounded-none pl-4 border py-3 bg-transparent border-primary '
				)}
				placeholder={message.searchPlaceholder}
				type="search"
			/>
			<Select
				onValueChange={(e) => {
					// setLanguage(e as LanguageCode)
				}}>
				<SelectTrigger className="w-32 border border-primary ">
					<SelectValue placeholder={'And'} defaultValue={'And'} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					<SelectItem value={'And'} className="w-20 border border-primary ">
						And
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default AdvSearchInput
