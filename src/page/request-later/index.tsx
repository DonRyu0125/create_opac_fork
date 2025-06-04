import Layout from '@/components/layouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useJSONData from '@/hooks/useJSONData'
import { removeQuote } from '@/lib/utils'
import { Archive, ChevronDownIcon, CircleEllipsis } from 'lucide-react'
import React, { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { endOfMonth, subMonths } from 'date-fns'
import { DatePickerWithRange } from '@/components/common/client-profile/DatePickerWithRange'
import { Calendar } from '@/components/ui/calendar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const RequestLater = () => {
	const { backToSummary, records, getMedia, common } = useJSONData({ selector: '#xml_record' })
	let reqData = records[0].request
	const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		window.history.back()
	}
	const [selected, setSelected] = useState<Date>()
	const [time, setTime] = useState('')

	const weekdayToIndex: any = {
		su: 0,
		mo: 1,
		tu: 2,
		we: 3,
		th: 4,
		fr: 5,
		sa: 6,
	}

	const operation_day_entry = [
		{ weekday: 'mo', collection_time_entry: [{ start_time: '10:00', end_time: '10:59' }] ,date_closed: 'X'},
		{ weekday: 'tu', collection_time_entry: [{ start_time: '10:00', end_time: '10:59' }] },
		{ weekday: 'we', collection_time_entry: [{ start_time: '10:00', end_time: '10:59' }] },
		{ weekday: 'th', collection_time_entry: [{ start_time: '10:00', end_time: '10:59' }] },
		{ weekday: 'fr', collection_time_entry: [{ start_time: '10:00', end_time: '10:59' }] },
		{ weekday: 'sa', date_closed: 'X' },
		{ weekday: 'su', date_closed: 'X' },
	]

	const closure_date_entry = [
		{ closure_date: '2025-06-07', closure_desc: 'Canada Day' },
		{ closure_date: '2025-06-04', closure_desc: 'B.C. Day' },
		{ closure_date: '2025-09-01', closure_desc: 'Labour Day' },
		{ closure_date: '2025-09-30', closure_desc: 'National Day for Truth and Reconciliation' },
		{ closure_date: '2025-10-13', closure_desc: 'Thanksgiving Day' },
		{ closure_date: '2025-11-11', closure_desc: 'Remembrance Day' },
		{ closure_date: '2025-12-25', closure_desc: 'Christmas Day' },
		{ closure_date: '2025-12-26', closure_desc: 'Boxing Day' },
	]

	const sp_open_date_entry = [
		{
			open_date: '2025-06-07',
			sp_open_collection_time_entry: [
				{ sp_start_time: '10:00', sp_end_time: '10:59' },
				{ sp_start_time: '11:00', sp_end_time: '11:59' },
			],
			sp_cutoff_date: '2025-06-06',
			sp_cufoff_time: '12:00',
		},
		{
			open_date: '2025-06-28',
			sp_open_collection_time_entry: [
				{ sp_start_time: '10:00', sp_end_time: '10:59' },
				{ sp_start_time: '11:00', sp_end_time: '11:59' },
			],
			sp_cutoff_date: '2025-06-06',
			sp_cufoff_time: '12:00',
		},
	]

	const openWeekdays = operation_day_entry
		.filter((d) => d.date_closed !== 'X')
		.map((d) => weekdayToIndex[d.weekday])

	const closureDates = new Set(closure_date_entry.map((d) => d.closure_date))

	const specialOpenDates = new Set(sp_open_date_entry.map((d) => d.open_date))

	function isOpen(date: Date) {
		const yyyyMMdd = date.toISOString().split('T')[0]
		if (specialOpenDates.has(yyyyMMdd)) return true
		if (closureDates.has(yyyyMMdd)) return false
		return openWeekdays.includes(date.getDay())
	}

	return (
		<Layout>
			<section>
				<div className="bg-gray-50 min-h-screen py-10">
					<div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
						{/* Header */}
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
								<div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
									<p>
										You have requested to view <b>{reqData.req_item_title}</b>{' '}
										with the reference number: <b>{reqData.req_item_id}</b>
									</p>
									<p>
										Please confirm whether you would like to proceed with this
										request.
									</p>
								</div>

								<div>
									<div className="border p-4 rounded">
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
								</div>
								<div className="flex items-center text-xl font-bold mt-7">
									<CircleEllipsis className="mr-2" />
									Please select the date of your visit
								</div>
								<div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
									<p>Your request will be fulfilled in three business days.</p>
									<p>
										Please confirm whether you would like to proceed with this
										request.
									</p>
								</div>
								<div className="w-full md:flex ">
									<div className="md:w-1/2 flex justify-center">
										<Calendar
											mode="single"
											selected={selected}
											onSelect={setSelected}
											disabled={(date) => !isOpen(date)}
										/>
									</div>
									<div className="md:w-1/2">
										<div className="text-lg font-bold mt-2">Selected Date</div>
										<Input
											className="inline-flex items-center justify-between px-4 py-2 border rounded bg-white shadow text-sm w-40"
											value={
												selected ? selected.toISOString().split('T')[0] : ''
											}
											readOnly
										/>
										<div className="text-lg font-bold mt-2">Select a Time</div>
										<DropdownMenu.Root>
											<DropdownMenu.Trigger className="inline-flex items-center justify-between px-4 py-2 border rounded bg-white shadow text-sm w-40">
												{time}
												<ChevronDownIcon className="h-4 w-4" />
											</DropdownMenu.Trigger>
											<DropdownMenu.Portal>
												<DropdownMenu.Content
													sideOffset={5}
													className="rounded-md bg-white shadow-md border p-1 text-sm w-40">
													{['Profile', 'Settings'].map((item: any) => (
														<DropdownMenu.Item
															key={item}
															className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
															onSelect={() => setTime(item)}>
															{item}
														</DropdownMenu.Item>
													))}
												</DropdownMenu.Content>
											</DropdownMenu.Portal>
										</DropdownMenu.Root>
										<input type="hidden" name="dropdown" value={time} />
									</div>
								</div>

								<div className="flex justify-center md:justify-end mt-5">
									<Button
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
