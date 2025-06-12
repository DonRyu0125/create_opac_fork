import { CalendarCheck, SquareCheck } from 'lucide-react'
import React, { useRef, useState } from 'react'

import { Input } from '@/components/ui/input'
import useJSONData from '@/hooks/useJSONData'
import { Button } from '@/components/ui/button'
import { getCookieValue, getHomeSessionID, removeQuote } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import TooltipButton from '@/components/common/TooltipButton'

// Request Later for Description item
const RequestDescLater = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const { message } = useConstants()
	const record = records[0]
	const requestData = record?.request
	const formRef = useRef<any>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		const patronID = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
		if (!patronID) return
	
		setLoading(true)
	
		await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				ITEM_REQ_TIME: requestData.item_req_time,
				METHOD_REQUEST: requestData.method_request,
				REQ_TOPIC: requestData.req_topic,
				REQ_APPL_NAME: requestData.req_appl_name,
				REQ_DB_NAME: requestData.req_db_name,
				REQ_DB_LINK2: requestData.req_db_link2,
				REQ_QUEUE: requestData.req_queue,
				REQ_DB_RECID: requestData.req_db_recid,
				REQ_TITLE: requestData.req_title,
				REQ_ITEM_ID: requestData.req_item_id,
				REQ_ACC_NUMBER: requestData.req_acc_number,
				REQ_ITEM_TITLE: requestData.req_item_title,
			}),
		})
	
		setLoading(false)
	}

	return (
		<button
			// tooltipContent={message.requestRecordLater}
			// variant="outline"
			// disabled={loading}
			className={'min-w-[30px] mx-1'}
			onClick={(e) => {
				e.stopPropagation()
				handleSubmit()
			}}>
			<CalendarCheck className="min-w-[20px] w-full h-full" />
		</button>
	)
}

export default RequestDescLater
