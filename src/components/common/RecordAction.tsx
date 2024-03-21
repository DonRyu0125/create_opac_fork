import useJSONData from '@/hooks/useJSONData'
import { Button } from '../ui/button'
import { ArrowLeftIcon, ArrowRightIcon, BookMarked, Heart, Link, Printer, Undo } from 'lucide-react'

const RecordAction = () => {
	const { nextRecord, previousRecord } = useJSONData({ selector: '#xml_record' })
	const goToURL = (url: string | null) => {
		if (url) {
			window.location.href = url
		}
	}
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-row justify-between">
				<Button disabled={!previousRecord} onClick={() => goToURL(previousRecord)}>
					<ArrowLeftIcon /> Previous
				</Button>

				<div className="flex space-x-4">
					<Button className="" variant="outline">
						<Heart className="w-4 h-4 mr-2" /> Save
					</Button>
					<Button variant="outline">
						<Link className="w-4 h-4 mr-2" /> Copy
					</Button>
					<Button variant="outline">
						<Printer className="w-4 h-4 mr-2" /> Print
					</Button>
				</div>
				<Button disabled={!nextRecord} onClick={() => goToURL(nextRecord)}>
					<ArrowRightIcon /> Next
				</Button>
			</div>
		</div>
	)
}

export default RecordAction
