import useConstants from '@/hooks/useConstants'
import Layout from '@/components/layouts'
import useJSONData from '@/hooks/useJSONData'
import { Button } from '../../components/ui/button'
import { Input } from '@/components/ui/input'
import { Archive, CircleEllipsis, Landmark, LibraryBig } from 'lucide-react'
import { convertToArr, convertXMLToJson, removeQuote } from '@/lib/utils'
import { useEffect, useState } from 'react'
import axios from 'axios'

type DeliveryTimeEntry = {
	delivery_type: 'OFFSITESTD' | 'OFFSITECOLD' | 'OFFSITECOOL'
	delivery_day: string
}

const Request = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const { message } = useConstants()
	let reqData: any = records[0].request
	const handleGoBack = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		window.history.back()
	}
	let container = reqData.container
	const [calData, setCalData] = useState<any>({
		delivery_time_entry: [],
	})

	useEffect(() => {
		getData()
	}, [])

	const getData = async () => {
		return await axios
			.get(`/preprocessing/paramter_calendar.html`, {
				headers: {
					'Content-Type': 'text/xml',
				},
				withCredentials: true,
				timeout: 5000,
			})
			.then((res) => {
				const conToJson = convertXMLToJson(res.data)
				const calDataJson = conToJson.calendar_info
				setCalData({
					delivery_time_entry: convertToArr(calDataJson.delivery_time_entry),
				})
			})
	}

	const getDeliveryDate = (item_delivery_type: string) => {
		let days = calData?.delivery_time_entry.find((item: DeliveryTimeEntry) => item.delivery_type === item_delivery_type)
		if (days) {
			return days
		}
	}

	return (
		<Layout>
			<section>
				<div className="bg-gray-50 min-h-screen py-10">
					<div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
						{/* Header */}
						<div className="flex justify-between items-center border-b pb-4">
							<h1 className="flex items-center text-xl font-bold">
								<CircleEllipsis className="mr-2" />
								{message.request} {message.confirmation}
							</h1>
							<div className="text-right">
								<form method="post" className="m-0" action={removeQuote(reqData.action)}>
									{/* <Input type="hidden" name="AUTO_APPROVE" value={reqData.auto_approve} />
									<Input type="hidden" name="REQ_PROCESS_DATE" value={reqData.req_process_date} />
									<Input type="hidden" name="REQ_STATUS" value={reqData.req_status} /> */}
									{/* <Input type="hidden" name="REQ_LOC_CODE" value={reqData.req_loc_code} /> */}
									<Input type="hidden" name="req_db_name" value={'description'} />
									<Input type="hidden" name="REQ_DB_RECID" value={reqData.req_db_recid} />
									<Input type="hidden" name="TIME_NEEDED" value={reqData.time_needed} />
									<Input type="hidden" name="DATE_NEEDED" value={reqData.date_needed} />
									<Input type="hidden" name="REQ_DB_LINK1" value={reqData.req_db_link1} />
									<Input type="hidden" name="METHOD_REQUEST" value={reqData.method_request} />
									<Input type="hidden" name="REQ_TOPIC" value={reqData.req_topic} />
									<Input type="hidden" name="REQ_APPL_NAME" value={reqData.req_appl_name} />
									<Input type="hidden" name="REQ_ITEM_ID" value={reqData.req_item_id} />
									<Input type="hidden" name="REQ_NEXT_COLLECT" value={'X'} />
									<Input
										type="hidden"
										name="REQ_ITEM_TITLE"
										value={
											typeof reqData.req_item_title === 'object'
												? reqData.req_item_title.__text.replace(/\s+/g, ' ').trim()
												: reqData.req_item_title
										}
									/>
									<Button className="bg-primary rounded mx-1 hover:bg-primary" type="submit" name="Submit" variant="default">
										{message.request}
									</Button>
									<Button
										className="bg-primary rounded mx-1 hover:bg-primary"
										type="submit"
										name="Submit2"
										variant="default"
										onClick={handleGoBack}>
										{message.cancel}
									</Button>
								</form>
							</div>
						</div>
						{/* <div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
							<p>
								{message.requestedToView}
								<b>{` ${reqData?.req_item_title}`}</b>
							</p>
							<p>
								{' '}
								{message.referenceNo} <b>{reqData.req_item_id}</b>
							</p>
							<p>
								{`Your request will be fulfilled `}
								<b>{`${getDeliveryDate(container?.item.aone_loc) ?? 1}`}</b>
								{` in  business days.`}
							</p>
							<p>{message.confirmRequest}</p>
						</div> */}
						<div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
							<p>
								{message.requestFor} <b>{reqData.req_item_title ?? reqData.req_title}</b> - <b>{reqData.req_item_id}</b>
							</p>
							<p>{reqData.sentence_1}</p>
							<p>
								<b>{reqData.date_needed} {reqData.time_needed}</b>
							</p>
							<p> {message.visitRequirement}</p>
						</div>

						<div>
							<div className="border p-4 rounded">
								{reqData.req_db_name === 'description' ? (
									<>
										<div className="flex flex-row items-center">
											<Archive className="mr-2" />
											<h1 className="text-xl font-bold">{message.archives}</h1>
										</div>
										<p className="text-lg font-bold mt-2">{reqData.req_item_title}</p>
										<div>
											<p className="text-sm text-gray-600">
												{message.barcode} : {reqData?.req_item_id}
											</p>
										</div>
									</>
								) : reqData.req_db_name === 'COLLECTIONS_WEB' ? (
									<>
										<div className="flex flex-row items-center">
											<LibraryBig className="mr-2" />
											<h1 className="text-xl font-bold">{message.library}</h1>
										</div>
										<p className="text-lg font-bold mt-2">{reqData.req_item_title}</p>
										<p className="text-sm text-gray-600">
											{message.referenceNo}: {reqData.req_item_id}
										</p>
										{reqData.req_acc_number ? <p className="text-sm text-gray-600">{message.accessionNumber}: </p> : ''}
									</>
								) : reqData.req_db_name === 'BIBLIO_WEB' ? (
									<>
										<div className="flex flex-row items-center">
											<LibraryBig className="mr-2" />
											<h1 className="text-xl font-bold">{message.library}</h1>
										</div>
										<p className="text-lg font-bold mt-2">{reqData.req_item_title}</p>
										<p className="text-sm text-gray-600">
											{message.referenceNo}: {reqData.req_item_id}
										</p>
										{reqData.req_acc_number ? <p className="text-sm text-gray-600">{message.accessionNumber}: </p> : ''}
									</>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default Request
