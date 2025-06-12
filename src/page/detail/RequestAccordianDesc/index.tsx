import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { CalendarCheck, ChevronDown, SquareCheck } from 'lucide-react'
import { cn, getCookieValue, getHomeSessionID, removeQuote } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import TooltipButton from '@/components/common/TooltipButton'
import axios from 'axios'
import { Input } from '@/components/ui/input'

type ItemContent = {
	id: string
	item_type: string
	aone_loc: string
	aone_status: string
	location_details: string
	ref_code: string
}

const ITEMS_PER_PAGE = 20

const RequestAccordianDesc = ({ items }: { items: { title: string }[] }) => {
	const { message } = useConstants()
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const formRef = useRef<any>(null)
	const { container, request } = record
	const requestData = request
	const [loading, setLoading] = useState(false)
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const [visibleCounts, setVisibleCounts] = useState<Record<number, number>>({})
	const loadMoreRef = useRef<HTMLDivElement | null>(null)

	const toggleItem = (index: number) => {
		setOpenIndex((prev) => (prev === index ? null : index))
		if (!visibleCounts[index]) {
			setVisibleCounts((prev) => ({ ...prev, [index]: ITEMS_PER_PAGE }))
		}
	}

	useEffect(() => {
		if (!loadMoreRef.current) return

		const scrollContainer = loadMoreRef.current.closest('.overflow-auto')
		if (!scrollContainer) return

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]
				if (entry.isIntersecting && openIndex !== null) {
					setVisibleCounts((prev) => ({
						...prev,
						[openIndex]: (prev[openIndex] || ITEMS_PER_PAGE) + ITEMS_PER_PAGE,
					}))
				}
			},
			{
				root: scrollContainer,
				threshold: 1.0,
			}
		)

		observer.observe(loadMoreRef.current)
		return () => observer.disconnect()
	}, [openIndex])

	const handleRequest = () => {
		const patronID = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
		setLoading(true)
		if (patronID) {
			formRef.current.submit()
			setLoading(false)
		}
	}

	return (
		<div className="w-full mx-auto space-y-2">
			{items.map((item, index) => (
				<div key={index} className="border rounded-md">
					<Button
						className="flex justify-between items-center w-full p-4 text-left bg-primary text-white"
						onClick={() => toggleItem(index)}
						aria-expanded={openIndex === index}
						aria-controls={`accordion-content-${index}`}>
						<span className="font-medium">{item.title}</span>
						<ChevronDown className={cn('w-5 h-5 transition-transform duration-200', openIndex === index && 'transform rotate-180')} />
					</Button>
					{openIndex === index && (
						<div id={`accordion-content-${index}`} className="p-4 pt-0">
							<div className="overflow-auto max-h-[400px] mt-2">
								<table className="min-w-full text-sm border">
									<thead className="bg-gray-100 sticky top-0 z-10">
										<tr>
											<th className="border px-4 py-2 text-left font-medium text-gray-700">Barcode ID</th>
											<th className="border px-4 py-2 text-left font-medium text-gray-700">{message.location}</th>
											<th className="border px-4 py-2 text-left font-medium text-gray-700">{message.type}</th>
											<th className="border px-4 py-2" />
										</tr>
									</thead>
									<tbody>
										{container &&
											container.item.slice(0, visibleCounts[index] || 0).map((value: ItemContent, idx: number) => (
												<tr key={value.id}>
													<td className="border px-4 py-2 min-w-[104px]">{value.id}</td>
													<td className="border px-4 py-2">{value.location_details}</td>
													<td className="border px-4 py-2">{value.item_type}</td>
													<td className="border px-4 py-2">
														<div className="flex gap-2">
															<TooltipButton
																disabled={loading}
																tooltipContent={message.request}
																variant="outline"
																onClick={(e) => {
																	handleRequest()
																}}>
																<SquareCheck className="min-w-[20px] w-full h-full" />
																<form
																	method="post"
																	ref={formRef}
																	action={
																		getHomeSessionID() +
																		'/1/' +
																		record.request.req_db_link2 +
																		'?REQUESTLOGIN&REPORT=DIRECT_REQUEST_FORM'
																	}
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
																</form>
															</TooltipButton>
															<TooltipButton
																tooltipContent={message.requestRecordLater}
																variant="outline"
																onClick={(e) => {
																	handleRequest()
																}}>
																<CalendarCheck />
																<form
																	method="post"
																	ref={formRef}
																	action={removeQuote(requestData.action_later)}
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
																</form>
															</TooltipButton>
														</div>
													</td>
												</tr>
											))}
									</tbody>
								</table>
								<div ref={loadMoreRef} className="h-8" />
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	)
}

export default RequestAccordianDesc
