import Layout from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useJSONData from '@/hooks/useJSONData'
import { removeQuote } from '@/lib/utils'
import { Archive, ChevronDownIcon, CircleEllipsis } from 'lucide-react'
import React, { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import dummy from './dummy.json'
import useConstants from '@/hooks/useConstants'

const RequestLater = () => {
	const { backToSummary, records, getMedia, common } = useJSONData({ selector: '#xml_record' })
	let reqData = records[0].request
	const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		window.history.back()
	}
	const { message } = useConstants()
	const [selectDate, setSelectDate] = useState<{
		date: Date
		timeSlots: {
			start_time?: string
			end_time?: string
			sp_start_time?: string
			sp_end_time?: string
		}[]
	} | null>(null)
	const [time, setTime] = useState()
	const data = dummy.calendar_info

	const weekdayToIndex: any = {
		su: 0,
		mo: 1,
		tu: 2,
		we: 3,
		th: 4,
		fr: 5,
		sa: 6,
	}

	const openWeekdays = data.operation_day_entry
		.filter((d) => d.date_closed !== 'X')
		.map((d) => weekdayToIndex[d.weekday])
	const closureDates = new Set(data.closure_date_entry.map((d) => d.closure_date))
	const specialOpenDates = new Set(data.sp_open_date_entry.map((d) => d.open_date))

	function isOpen(date: Date) {
		const yyyyMMdd = date.toISOString().split('T')[0]
		if (specialOpenDates.has(yyyyMMdd)) return true
		if (closureDates.has(yyyyMMdd)) return false
		return openWeekdays.includes(date.getDay())
	}

	const handleSelect = (date: Date | undefined) => {
		if (!date) return

		const yyyyMMdd = date.toISOString().split('T')[0]
		const sp = data.sp_open_date_entry.find((d) => d.open_date === yyyyMMdd)
		if (sp) {
			setSelectDate({ date, timeSlots: sp.sp_open_collection_time_entry })
			return
		}
		const day = date.getDay()
		const weekdayKey = Object.keys(weekdayToIndex).find((key) => weekdayToIndex[key] === day)
		const op = data.operation_day_entry.find(
			(d) => d.weekday === weekdayKey && d.date_closed !== 'X'
		)

		setSelectDate({ date, timeSlots: op?.collection_time_entry || [] })
	}

	return (
		<Layout>
			<section>
				<div className="bg-gray-50 min-h-screen py-10">
					<div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
						<div className="flex justify-between items-center border-b pb-4">
							<form
								method="post"
								className="m-0 w-full"
								action={removeQuote(reqData.action)}>
								<Input
									type="hidden"
									name="AUTO_APPROVE"
									value={reqData.auto_approve}
								/>
								<Input
									type="hidden"
									name="REQ_PROCESS_DATE"
									value={reqData.req_process_date}
								/>
								<Input type="hidden" name="REQ_STATUS" value={reqData.req_status} />
								<Input type="hidden" name="REC_STATUS" value={reqData.rec_status} />
								<Input
									type="hidden"
									name="REQ_DB_NAME"
									value={reqData.req_db_name}
								/>
								<Input
									type="hidden"
									name="REQ_DB_RECID"
									value={reqData.req_db_recid}
								/>
								<Input
									type="hidden"
									name="TIME_NEEDED"
									value={reqData.time_needed}
								/>
								<Input
									type="hidden"
									name="REQ_DB_LINK2"
									value={reqData.req_db_link2}
								/>
								<Input
									type="hidden"
									name="METHOD_REQUEST"
									value={reqData.method_request}
								/>
								<Input type="hidden" name="REQ_TOPIC" value={reqData.req_topic} />
								<Input
									type="hidden"
									name="REQ_LOC_CODE"
									value={reqData.req_loc_code}
								/>
								<Input
									type="hidden"
									name="REQ_APPL_NAME"
									value={reqData.req_appl_name}
								/>
								<Input type="hidden" name="REQ_TITLE" value={reqData.req_title} />
								<Input
									type="hidden"
									name="REQ_ITEM_ID"
									value={reqData.req_item_id}
								/>
								<Input
									type="hidden"
									name="REQ_ACC_NUMBER"
									value={reqData.req_acc_number}
								/>
								<Input
									type="hidden"
									name="REQ_ITEM_TITLE"
									value={
										typeof reqData.req_item_title === 'object'
											? reqData.req_item_title.__text
													.replace(/\s+/g, ' ')
													.trim()
											: reqData.req_item_title
									}
								/>
								<Input type="hidden" name="REQ_QUEUE" value={reqData.req_queue} />
								<h1 className="flex items-center text-xl font-bold">
									<CircleEllipsis className="mr-2" />
									Request Order Later
								</h1>

								<div className="mt-3 border p-4 rounded">
									<div className="flex flex-row items-center">
										<Archive className="mr-2" />
										<h1 className="text-xl font-bold">Archives</h1>
									</div>
									<p className="text-lg font-bold mt-2">
										{reqData.req_item_title}
									</p>
									<p className="text-sm text-gray-600">
										Reference Number: {reqData.req_item_id}
									</p>
								</div>

								<div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
									<p>
										This request requires that you visit archive in
										person to see the item. Items can only be requested a
										maximum of two weeks in advance of your visit.
									</p>
								</div>
								<div className="flex items-center text-xl font-bold mt-7">
									<CircleEllipsis className="mr-2" />
									Please select the date of your visit
								</div>
								<div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
									<p>
										The item will typically be ready to use in the Archives
										Study Area within an hour of your selected time (e.g.
										documents in the 11:00 collection are usually ready for use
										by 12:00).
									</p>
								</div>
								<div className="w-full md:flex ">
									<div className="md:w-1/2 flex justify-center">
										<Calendar
											mode="single"
											selected={selectDate?.date}
											onSelect={handleSelect}
											disabled={(date) => !isOpen(date)}
										/>
									</div>
									<div className="md:w-1/2 flex justify-center md:block">
										<div className={'mx-2 md:mx-0'}>
											<div className="text-lg font-bold mt-2">
												Select Date
											</div>
											<input
												className="inline-flex items-center justify-between px-4 py-2 border rounded bg-white shadow text-sm w-40"
												value={
													selectDate
														? selectDate.date
																.toISOString()
																.split('T')[0]
														: ''
												}
												readOnly
											/>
										</div>
										<div className={'mx-2 md:mx-0'}>
											<div className="text-lg font-bold mt-2">
												Select a Time
											</div>
											<DropdownMenu.Root>
												<DropdownMenu.Trigger className="inline-flex items-center justify-between px-4 py-2 border rounded bg-white shadow text-sm w-40">
													{time || 'Select'}
													<ChevronDownIcon className="h-4 w-4" />
												</DropdownMenu.Trigger>
												<DropdownMenu.Portal>
													<DropdownMenu.Content
														sideOffset={5}
														className="rounded-md bg-white shadow-md border p-1 text-sm w-40">
														{selectDate?.timeSlots.map(
															(item: any, idx) => (
																<DropdownMenu.Item
																	key={idx}
																	className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
																	onSelect={() =>
																		setTime(
																			item.start_time ??
																				item.sp_start_time
																		)
																	}>
																	{item.start_time ??
																		item.sp_start_time}
																</DropdownMenu.Item>
															)
														)}
													</DropdownMenu.Content>
												</DropdownMenu.Portal>
											</DropdownMenu.Root>
										</div>
										<input type="hidden" name="dropdown" value={time} />
									</div>
								</div>

								<div className="flex justify-center md:justify-end mt-5">
									<Button
										disabled={time && selectDate ? false : true}
										className="bg-primary rounded mx-1 hover:bg-primary"
										type="submit"
										name="Submit"
										variant="default">
										Place Request
									</Button>
									<Button
										className="bg-primary rounded mx-1 hover:bg-primary"
										variant="default"
										onClick={handleGoBack}>
										Cancel Request
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default RequestLater
