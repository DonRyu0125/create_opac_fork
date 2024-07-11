import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import React from 'react'
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

const AdvSearchInput = ({ className, inputName, inputStyle, ...props }: SearchFormProps) => {
	const { message, home } = useConstants()
	return (
		<div className="w-full flex relative m-2">
            <Select
				onValueChange={(e) => {
					// setLanguage(e as LanguageCode)
				}}>
				<SelectTrigger className="w-16 border border-primary ">
					<SelectValue placeholder={'Select'} />
				</SelectTrigger>
				<SelectContent position={'popper'}>
					<SelectItem
						value={'And'}
						className="w-16 border border-primary ">
						And
					</SelectItem>
				</SelectContent>
			</Select>
			<Input
				required
				name={inputName}
				className={cn(
					'w-full rounded-none pl-4 border py-3 bg-transparent border-primary ',
					inputStyle
				)}
				placeholder={message.searchPlaceholder}
				type="search"
			/>
			{/* <Button variant={'default'} className="h-full bg-opac-green" type="submit">
				<span className=" block">
					<Menu className="w-4 h-4" />
				</span>
			</Button> */}
			<Select
				onValueChange={(e) => {
					// setLanguage(e as LanguageCode)
				}}>
				<SelectTrigger className="w-16 border border-primary ">
					<SelectValue placeholder={'And'} defaultValue={'And'}/>
				</SelectTrigger>
				<SelectContent position={'popper'}>
					<SelectItem
						value={'And'}
						className="w-14 border border-primary ">
						And
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default AdvSearchInput
