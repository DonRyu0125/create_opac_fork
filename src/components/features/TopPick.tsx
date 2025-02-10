import Marquee from '@/components/ui/marquee'
import useConstants from '@/hooks/useConstants'
import { cn } from '@/lib/utils'
import { PageSectionProps } from '@/page/Home'
import { Archive } from 'lucide-react'
import Section from '../common/Section'

const items = [
	{
		name: 'MINISIS WILL TEST 1',
		username: 'Museum',
		body: 'test',
		img: 'https://avatar.vercel.sh/jack',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/COLLECTIONS_WEB/WEB_UNION_DETAIL?sessionsearch&exp=ACCESSION_NUMBER 65526',
	},
	{
		name: 'Training (4-0)',
		username: 'File',

		body: 'File consists of Instructions - Equipment 100 round magazine Bren MkII- correspondence - between: officials from Military district No.2; from Canadian Small Arms Training Centre;...',
		img: 'https://avatar.vercel.sh/jill',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+394',
	},

	
	{
		name: "Minutes of Convocation",
		username: 'Series',

		body: 'Series consists of volumes containing the minutes of Convocation for the period 1797 to 2022. Volumes 2 to 42 (1832-1973) contain indexes prepared by the Secretary. ...',
		img: 'https://avatar.vercel.sh/james',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+1',
	},
	{
		name: "test object v3",
		username: 'Museum',

		body: 'Military Unit',
		img: 'https://avatar.vercel.sh/james',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/COLLECTIONS_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+1',
	},
	{
		name: "MINISIS TEST WILL 242",
		username: 'Museum',

		body: 'Administrative report',
		img: 'https://avatar.vercel.sh/james',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/COLLECTIONS_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+2',
	},
]

const secondRow = items.slice(items.length / 2)

const ReviewCard = ({
	img,
	name,
	username,
	body,
	onClick,
}: {
	img: string
	name: string
	username: string
	body: string
	onClick: () => void
}) => {
	return (
		<figure
			className={cn(
				'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 hover:shadow-md'
			)}
			onClick={onClick}>
			<div className="flex flex-row items-center gap-2">
				<Archive />
				<div className="flex flex-col">
					<figcaption className="text-sm font-bold text-primary">{name}</figcaption>
					<p className="text-xs font-medium ">{username}</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{body}</blockquote>
		</figure>
	)
}

const TopPick = ({ page, previewData, previewMode }: PageSectionProps) => {
	const sourceData = useConstants()[page]
	const data = previewMode && previewData ? (previewData as typeof sourceData) : sourceData
	const { message } = useConstants()
	return (
		<Section heading={message.topPick}>
			<div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border  ">
				<Marquee reverse pauseOnHover className="[--duration:25s]">
					{secondRow.map((review) => (
						<ReviewCard
							onClick={() => {
								window.location.href = review.url
							}}
							key={review.username}
							{...review}
						/>
					))}
				</Marquee>
				<div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent dark:from-transparent"></div>
				<div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent dark:from-transparent"></div>
			</div>
		</Section>
	)
}

export default TopPick
