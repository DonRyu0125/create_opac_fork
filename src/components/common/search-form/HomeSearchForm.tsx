import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useConstants from '@/hooks/useConstants'
import { Search } from 'lucide-react'

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
		<Card className="w-full max-w-3xl mx-auto rounded-md shadow-lg">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-left">
					Search all collections
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<form method="POST" action={action} className="flex space-x-2 mb-4 relative">
					<Input
						className="w-full h-14 pl-6 pr-32 text-lg border-2 border-gray-200 focus:border-primary "
						required
						name={inputName || 'KEYWORD_CLUSTER'}
						placeholder={message.searchPlaceholder}
						type="search"
					/>
					<Button className="absolute right-2 top-2 h-10 px-8 rounded-full bg-primary">
						<span className="block">
							<Search className="w-4 h-4 mr-6" />
						</span>
						Search
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
