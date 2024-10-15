import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import useConstants from '@/hooks/useConstants'
import { Clock, CreditCard, LockKeyhole, Search } from 'lucide-react'

export interface HomeSearchFormProps extends React.HTMLAttributes<HTMLFormElement> {
	inputName?: string
	inputStyle?: string
	action: string
}

export default function HomeSearchForm({
	className,
	inputName,
	inputStyle,
	action,
	...props
}: HomeSearchFormProps) {
	const { message } = useConstants()
	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-left">
					Search all collections
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex space-x-2 mb-4">
					<Input
						className="flex-grow"
						required
						name={inputName || 'KEYWORD_CLUSTER'}
						placeholder={message.searchPlaceholder}
						type="search"
					/>
					<Button className="bg-primary rounded-md ">
						<span className="block">
							<Search className="w-4 h-4 mr-6" />
						</span>
						Search
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
