import { CalendarCheck, SquareCheck } from 'lucide-react'
import React, { useRef, useState } from 'react'
import TooltipButton from '../TooltipButton'
import { Input } from '@/components/ui/input'
import useJSONData from '@/hooks/useJSONData'
import { Button } from '@/components/ui/button'
import { getCookieValue, getHomeSessionID, removeQuote } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'

// Request Later for Description item
const RequestDescLater = () => {
	const [loading, setLoading] = useState(false)
	const { nextRecord, previousRecord, records } = useJSONData({ selector: '#xml_record' })
	const { message } = useConstants()
	const record = records[0]
	const requestData = record?.request
	const formRef = useRef<any>(null)

	const handleSubmit = (action: string | null) => {
		const patronID = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
		if (patronID) {
			formRef.current.submit()
		}
	}

	return (
		<TooltipButton
			tooltipContent={message.requestRecordLater}
			variant="outline"
			className={'min-w-[30px] mx-1'}
			onClick={() => handleSubmit('Request')}>
			<CalendarCheck className="min-w-[20px] w-full h-full" />
			<form
				method="post"
				ref={formRef}
				action={removeQuote(requestData.req_later)}
				className="hidden">
				<Input type="hidden" name="ITEM_REQ_TIME" value={requestData.item_req_time} />
				<Input type="hidden" name="METHOD_REQUEST" value={requestData.method_request} />
				<Input type="hidden" name="REQ_TOPIC" value={requestData.req_topic} />
				<Input type="hidden" name="REQ_APPL_NAME" value={requestData.req_appl_name} />
				<Input type="hidden" name="REQ_DB_NAME" value={requestData.req_db_name} />
				<Input type="hidden" name="REQ_DB_LINK2" value={requestData.req_db_link2} />
				<Input type="hidden" name="REQ_QUEUE" value={requestData.req_queue} />
				<Input type="hidden" name="REQ_DB_RECID" value={requestData.req_db_recid} />
				<Input type="hidden" name="REQ_TITLE" value={requestData.req_title} />
				<Input type="hidden" name="REQ_ITEM_ID" value={requestData.req_item_id} />
				<Input type="hidden" name="REQ_ACC_NUMBER" value={requestData.req_acc_number} />
				<Input type="hidden" name="REQ_ITEM_TITLE" value={requestData.req_item_title} />
				<Button className="bg-primary" type="submit" variant="default"></Button>
			</form>
		</TooltipButton>
	)
}

export default RequestDescLater
