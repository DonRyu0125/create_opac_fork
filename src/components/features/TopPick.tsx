import Marquee from '@/components/ui/marquee'
import useConstants from '@/hooks/useConstants'
import { cn } from '@/lib/utils'
import { PageSectionProps } from '@/page/Home'
import { Archive } from 'lucide-react'
import Section from '../common/Section'

const items = [
	{
		name: 'Employee 1',
		username: 'MINISIS Inc.',
		body: 'Christopher Burcsik is the principal owner of MINISIS Inc. He serves as the Chief Executive Officer and Vice-President of Marketing.',
		img: 'https://avatar.vercel.sh/jack',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+3450',
	},
	{
		name: 'Employee 2',
		username: 'MINISIS Inc.',

		body: 'Christopher Burcsik is the principal owner of MINISIS Inc. He serves as the Chief Executive Officer and Vice-President of Marketing.',
		img: 'https://avatar.vercel.sh/jill',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+3451',
	},

	{
		name: 'Oskar Photograph',
		username: 'MINISIS Inc.',

		body: 'A printed photograph of Oskar the dog!',
		img: 'https://avatar.vercel.sh/jane',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+5',
	},

	{
		name: "Oskar's Cousin",
		username: 'MINISIS Inc.',

		body: 'This is a photograph of Oskars cousin, Titan!',
		img: 'https://avatar.vercel.sh/james',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+1',
	},
	{
		name: "London's Craft Beer Market",
		username: 'MINISIS Inc.',

		body: 'This is a series of records related to the Craft beer market that exists in London and contains detailed records and licenses associated with the business that created the market.',
		img: 'https://avatar.vercel.sh/james',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+3440',
	},
	{
		name: 'Employee 4',
		username: 'MINISIS Inc.',

		body: 'Christopher Burcsik is the principal owner of MINISIS Inc. He serves as the Chief Executive Officer and Vice-President of Marketing.',
		img: 'https://avatar.vercel.sh/jenny',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+3453',
	},
	{
		name: 'Employee 5',
		username: 'MINISIS Inc.',

		body: 'Christopher Burcsik is the principal owner of MINISIS Inc. He serves as the Chief Executive Officer and Vice-President of Marketing.',
		img: 'https://avatar.vercel.sh/james',
		url: 'https://camsopac-dev.minisisinc.com/scripts/mwimain.dll/144/DESCRIPTION_WEB/WEB_UNION_DETAIL?sessionsearch&exp=SISN+3454',
	},
]

const firstRow = items.slice(0, items.length / 2)
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
					<figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
					<p className="text-xs font-medium dark:text-white/40">{username}</p>
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
