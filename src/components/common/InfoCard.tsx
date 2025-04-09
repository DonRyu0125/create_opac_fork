import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import useConstants from '@/hooks/useConstants'
import { cn, convertLowerTrim } from '@/lib/utils'
import { Record } from '@/types/record'

export interface InfoCardProps {
	title: string | React.ReactNode
	className?: string
	description?: string | React.ReactNode
	footer?: React.ReactNode
	children?: React.ReactNode
	thumbnail?: string
	alt?: string
	record: Record
}

const InfoCard = ({
	title,
	description,
	className,
	footer,
	children,
	thumbnail,
	alt,
	record,
}: InfoCardProps) => {
	const { navigations } = useConstants().config

	const getColor = (event_type: string) => {
		let result = navigations?.filter((item) => {
			return convertLowerTrim(item.search_database) === convertLowerTrim(event_type)
		})

		return {
			color: `${result[0]?.color}`,
			title: `${result[0]?.title}`
		}
	}
	return (
		<Card
			className={cn(
				'cursor-pointer rounded-md shadow-md hover:shadow-xl border-2 border-primary relative',
				className
			)}>
			<div
				className={`absolute bg-gray-900 z-10 top-1 right-1 ${getColor(record.database_name).color} rounded-md text-white p-0.5 font-small`}>
				{getColor(record.database_name).title}
			</div>
			<CardHeader className="h-48 pb-0">
				<CardTitle className="text-lg font-bold">{title}</CardTitle>
				{description && (
					<CardDescription className="text-sm text-gray-500 dark:text-gray-400">
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="p-4 pt-0 text-sm leading-relaxed">
				{children}
				{thumbnail && (
					<img
						src={thumbnail}
						alt={alt || 'image thumbnail'}
						className=" rounded-md h-64 md:h-48 lg:h-52 object-cover mx-auto bg-gray-300"
					/>
				)}
			</CardContent>
			{footer && <CardFooter>{footer}</CardFooter>}
		</Card>
	)
}

export default InfoCard
