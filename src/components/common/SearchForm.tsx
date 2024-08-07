import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import useConstants from '@/hooks/useConstants'
export interface SearchFormProps extends React.HTMLAttributes<HTMLFormElement> {
	inputName: string
	inputStyle?: string
	action: string
}
const SearchForm = ({ className, inputName, inputStyle, action, ...props }: SearchFormProps) => {
	const { message } = useConstants()

	return (
		<form method="POST" action={action} className={'flex w-full max-w-[600px]'} {...props}>
			<div className="w-full relative">
				<Input
					required
					name={inputName}
					className={cn(
						'w-full rounded-none pl-4 border-2 py-3 bg-transparent border-opac-green text-white rounded-l-md italic ',
						inputStyle
					)}
					placeholder={message.searchPlaceholder}
					type="search"
				/>
			</div>
			<Button
				variant={'default'}
				className="right-0 top-0 h-full bg-opac-green rounded-l-lg"
				type="submit">
				<span className="block">
					<Search className="w-4 h-4" />
				</span>
			</Button>
		</form>
	)
}

export default SearchForm
