import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { copyRecordURL, deepSearchKey } from '@/lib/record'
import { ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import TooltipButton from '@/components/common/TooltipButton'

const DetailRecordAction = () => {
	const { toast } = useToast()
	// const { nextRecord, previousRecord, records } = useJSONData({ defaultData: DetailM3Sample })
	const { nextRecord, previousRecord, records } = useJSONData({ selector: '#xml_record' })
	const { message } = useConstants()
	const record = records[0]

	const goToURL = (url: string | null) => {
		if (url) {
			window.location.href = url
		}
	}

	const sisn = deepSearchKey(record, 'sisn')[0] as string
	const database = record.database_name
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-row justify-between space-x-2">
				<TooltipButton
					tooltipContent="Previous record"
					className="align-center"
					disabled={!previousRecord}
					onClick={() => goToURL(previousRecord)}>
					<ChevronLeft />
					<span className="hidden md:block">{message.previous}</span>
				</TooltipButton>

				<div className="flex space-x-2">
					<TooltipButton
						tooltipContent="Copy record URL"
						variant="outline"
						onClick={() => {
							copyRecordURL(database, sisn)
							toast({
								title: message.recordIsCopied,
							})
						}}>
						<Copy className="w-4 h-4 mr-2 hidden md:block" /> {message.copy}
					</TooltipButton>
					{/* <Button variant="outline">
						<Printer className="w-4 h-4 mr-2 hidden md:block" /> {message.print}
					</Button> */}
				</div>

				<TooltipButton
					tooltipContent="Next record"
					className="align-center"
					disabled={!nextRecord}
					onClick={() => goToURL(nextRecord)}>
					<span className="hidden md:block">{message.next}</span>
					<ChevronRight />
				</TooltipButton>
			</div>
		</div>
	)
}

export default DetailRecordAction
