import useJSONData from '@/hooks/useJSONData'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

const BookmarkAll = () => {
	const { common, records } = useJSONData({ selector: '#xml_record' })
	const { bookmark_url } = common
	const { toast } = useToast()

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
					title: 'All records has been bookmarked',
					action: <ToastAction altText="View bookmark">View bookmark</ToastAction>,
				})
				window.location?.reload()
			})
		}
	}

	return (
		<button
			onClick={bookmarkAllRecord}
			className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-gray-200">
			Bookmark All
		</button>
	)
}

export default BookmarkAll
