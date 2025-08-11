import { useRef, useState } from 'react'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { convertToArr, getCookieValue, getHomeSessionID, getSessionID } from '@/lib/utils'
import DropdownSelect from '@/components/common/DropdownSelect'
import { Button } from '@/components/ui/button'
import { CheckCheck, FolderOpen, RefreshCw } from 'lucide-react'
import axios from 'axios'

const HoldOn = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { message } = useConstants()
	const holdRequests = convertToArr(record.hold_on)
	const [selectedId, setselectedId] = useState<any>([])

	const handleCheck = (item: { id: string; value: string }, checked: boolean) => {
		const updated = checked ? [...selectedId, item] : selectedId.filter((b: { id: string; value: string }) => b.id !== item.id)
		setselectedId(updated)
	}

	const handleCheckAll = () => {
		const allBarcodes = holdRequests.map((item) => {
			return { id: item.id, value: item.value }
		})
		setselectedId(allBarcodes)
	}

	const getImage = (item: any) => {
		let imgArr = convertToArr(item.media)
		return imgArr[0]?.im_access_link ?? ''
	}

	const onSubmit = async () => {
		const data = selectedId.reduce(
			(acc: { [x: string]: any }, item: any) => {
				acc[item.id] = item.value
				return acc
			},
			{} as Record<string, string>
		)
		const params = new URLSearchParams(data).toString()
		return await axios.post(`${getSessionID()}/${record.sisn}?MANIPITEM&REPORT=WEB_LIBRARY_CIRC_DASHBOARD`, params, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})
	}

	console.log('selectedId',selectedId)
	return (
		<div className="mb-4 rounded-md bg-white p-3 shadow">
			<div className={'pb-2 text-lg font-semibold text-gray-900'}>{`On Hold (${record.hold_count})`}</div>

			{holdRequests.length > 0 ? (
				<>
					<div className="w-3/4 flex my-2">
						<Button onClick={onSubmit}>{message.cancel} Selected</Button>
						<Button onClick={handleCheckAll} className={'mx-1'}>
							Cancel All
						</Button>
						<Button onClick={() => setselectedId([])} className={'mx-1'}>
							<RefreshCw />
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-[415px] overflow-y-auto">
						{holdRequests.map((item, key) => {
							const checked = selectedId.some((selected:any) => selected.id === item.id)

							return (
								<div key={key} className="rounded-md bg-white p-6 shadow">
									<div className="flex flex-col gap-2">
										<div className="flex justify-between items-start">
											<a href={`${getHomeSessionID()}/BIBLIO_WEB/BARCODE/${item.barcode}/WEB_UNION_DETAIL?JUMP`}>
												<img
													alt={message.noMediaFound}
													src={getImage(item)}
													className="h-36 mx-auto cursor-pointer object-cover border-4 hover:border-primary w-[96px]"
												/>
											</a>
											<input
												type="checkbox"
												className="w-5 h-5 accent-primary border-gray-300 rounded  transition-all duration-150"
												checked={checked}
												onChange={(e) => handleCheck({ id: item.id, value: item.value }, e.target.checked)}
											/>
										</div>

										<div className="text-left font-bold h-[70px] overflow-hidden text-ellipsis">{item.title}</div>

										<div>
											<div className="flex justify-between">
												<span className="text-gray-500">Barcode</span>
												<span className="text-gray-900 font-medium">{item.barcode}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-500">Pick Up Before</span>
												<span className="text-gray-900 font-medium">{item.hold_expiry_date}</span>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</>
			) : (
				<div className="w-full max-w-3xl mx-auto p-4">
					<div className="text-center py-8 px-4">
						<FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
						<h3 className="mt-2 text-sm font-semibold text-gray-900">No items</h3>
					</div>
				</div>
			)}
		</div>
	)
}

export default HoldOn
