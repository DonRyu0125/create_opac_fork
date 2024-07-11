import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { SearchFormProps } from '../SearchForm'
import useConstants from '@/hooks/useConstants'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@radix-ui/react-select'

const AdvSearchInput = () => {
	const { message, advancedSearch } = useConstants()
	const [select, setSelect] = useState<string>();
	return (
		<div className="w-full flex relative m-2">
			<Select
				onValueChange={(e) => {
					setSelect(e)
				}}>
				<SelectTrigger className="w-72 border border-primary ">
				{select}
				</SelectTrigger>
				<SelectContent position={'popper'}>
					{advancedSearch.map((item) => {
						return (
							<SelectItem
								value={item.value}
								className="w-52 border border-primary bg-neutral-300 ">
								{item.label}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
			<Input
				required
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
				<SelectTrigger className="w-16 border border-primary ">
					<SelectValue placeholder={'And'} defaultValue={'And'} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					<SelectItem value={'And'} className="w-14 border border-primary ">
						And
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default AdvSearchInput
