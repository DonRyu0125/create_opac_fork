import TooltipButton from '@/components/common/TooltipButton'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { bookmarkSelect, removeBookmarkFromKey, validateBookmarkResponse } from '@/lib/bookmark'
import { copyRecordURL, deepSearchKey } from '@/lib/record'
import { cn } from '@/lib/utils'
import { bookmarkCount } from '@/store'
import { Record } from '@/types/record'
import { ToastAction } from '@radix-ui/react-toast'
import { useAtom } from 'jotai'
import { Copy, Star } from 'lucide-react'
import { useState } from 'react'

export const RecordAction = ({ record }: { record: Record }) => {
	const { database_name, is_bookmarked } = record
	const [like, setLike] = useState(is_bookmarked ? Boolean(JSON.parse(is_bookmarked)) : true)
	const { common } = useJSONData({ selector: '#xml_record' })
	const { bookmark_url, bookmark_count } = common
	const { toast } = useToast()
	const sisn = deepSearchKey(record, 'sisn')[0] as string
	const { message } = useConstants()
	const [count, setCount] = useAtom(bookmarkCount)
	const handleBookmark = () => {
		if (record.input?._name && like) {
			//if record.input?._name is exsisted, we use bookmark sum report, Don Ryu20240705
			removeBookmarkFromKey(record).then((res) => {
				setCount(count - 1)
			})

			toast({
				title: `${message.bookmarkHasBeenRemoved}`,
			})

			// reload page on summary bookmark only
			if (record.record.link_dbname) {
				window.location.reload()
			}
			return
		}

		// Display toast only if record has already been bookmarked
		if (like) {
			toast({
				title: `${message.recordAlreadyMarked}`,
				action: (
					<ToastAction altText={message.viewBookmark}>{message.viewBookmark}</ToastAction>
				),
			})
			return
		}

		// send request to bookmark
		bookmarkSelect(`${bookmark_url}`, record).then((res) => {
			const isValid = validateBookmarkResponse(
				res,
				typeof bookmark_count === 'number'
					? bookmark_count
					: Number.parseInt(bookmark_count || '0')
			)
			if (isValid && isValid.isSuccess) {
				setLike(true)
				setCount(isValid.newCount || count)
				toast({
					title: message.successfullBookmark,
					action: (
						<ToastAction altText={message.viewBookmark}>
							{message.viewBookmark}
						</ToastAction>
					),
				})
				return
			}
		})
	}

	const handleCopy = () => {
		copyRecordURL(database_name, sisn)
		toast({
			title: message.recordIsCopied,
		})
	}

	return (
		<>
			<TooltipButton
				variant="ghost"
				size="icon"
				onClick={handleBookmark}
				tooltipContent="Bookmark record">
				<Star
					className={cn('h-4 w-4 text-primary')}
					fill={like ? 'hsl(var(--opac-blue))' : 'rgb(0,0,0,0)'}
					stroke={like ? 'hsl(var(--opac-blue))' : 'hsl(var(--primary'}
				/>
			</TooltipButton>
			<Separator orientation="vertical" />
			<TooltipButton
				variant="ghost"
				size="icon"
				onClick={handleCopy}
				tooltipContent="Copy record URL">
				<Copy className="h-4 w-4 text-primary" />
			</TooltipButton>
			{/* {record.avail ? <><Separator orientation="vertical" />
			<TooltipButton
				variant="ghost"
				size="icon"
				onClick={handleCopy}
				tooltipContent="Request record">
				<Copyright className="h-4 w-4 text-primary" />
			</TooltipButton></> : ""} */}
		</>
	)
}
