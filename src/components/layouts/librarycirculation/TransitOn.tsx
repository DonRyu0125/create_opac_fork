import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { convertToArr, getHomeSessionID } from '@/lib/utils'
const TransitOn = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { message } = useConstants()
	const tranRequests = convertToArr(record.transit_on)

	const getImage = (item: any) => {
		let imgArr = convertToArr(item.media)
		return imgArr[0]?.im_access_link ?? ''
	}

	return (
		<div className="mb-4 rounded-md bg-white p-3 shadow">
			<div className={'pb-2 text-lg font-semibold text-gray-900'}>{`In Transit (${record.transit_count})`}</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{tranRequests.map((item, key) => {
					return (
						<div key={key} className="rounded-md bg-white p-6 shadow">
							<div className="flex flex-col gap-2">
								<div className="flex justify-between items-start">
									<a href={`${getHomeSessionID()}/BIBLIO_WEB/BARCODE/${item.barcode}/WEB_UNION_DETAIL?JUMP`}>
										<img
											alt={message.noMediaFound}
											src={getImage(item)}
											className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary"
										/>
									</a>
								</div>
								<div className="text-left font-bold h-[70px] overflow-hidden text-ellipsis">{item.title}</div>
								<div>
									<div className="flex justify-between">
										<span className="text-gray-500">Barcode</span>
										<span className="text-gray-900 font-medium">{item.barcode}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-500">Requested On</span>
										<span className="text-gray-900 font-medium">{item.wait_date}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-500">Location</span>
										<span className="text-gray-900 font-medium">{item.wait_pickup_loc}</span>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default TransitOn
