import useJSONData from '@/hooks/useJSONData'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import useConstants from '@/hooks/useConstants'

const BookmarkAll = () => {
	const { common, records } = useJSONData({ selector: '#xml_record' })
	const { bookmark_url } = common
	const { toast } = useToast()
	const { message } = useConstants()

	const bookmarkAllRecord = async () => {
		let dataString = records.map(({ record, database_name, is_bookmarked }) => {
			if (is_bookmarked === 'false') {
				return `mcheckbox_${record.sisn}=${record.sisn}-${database_name}`
			}
			return ''
		})
		if (!dataString.every((item) => item === '')) {
			await axios({
				method: 'post',
				url: `${bookmark_url}?ADDSELECTION&COOKIE=BOOKMARK`,
				data: dataString.join('&'),
			}).then(() => {
				toast({
					title: `${message.allRecordsBookmarked}`,
					action: <ToastAction altText="View bookmark">{message.viewBookmark}</ToastAction>,
				})
				window.location?.reload()
			})
		}else{
			toast({
				title: `${message.recordAlreadyMarked}`,
				action: <ToastAction altText="View bookmark">{message.viewBookmark}</ToastAction>,
			})
		}
	}

	return (
		<button
			onClick={bookmarkAllRecord}
			className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-gray-200">
			{message.bookmarkAll}
		</button>
	)
}

export default BookmarkAll
