import useJSONData from '@/hooks/useJSONData'
import axios from 'axios'

const BookmarkAll = () => {
	const { common, records } = useJSONData({ selector: '#xml_record' })
	const { bookmark_url } = common

	const bookmarkAllRecord = () => {
		let dataString = records.map(({ record, database_name }) => {
			return `mcheckbox_${record.sisn}=${record.sisn}-${database_name}`
		})
		axios({
			method: 'post',
			url: `${bookmark_url}?ADDSELECTION&COOKIE=BOOKMARK`,
			data: dataString,
		})
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
