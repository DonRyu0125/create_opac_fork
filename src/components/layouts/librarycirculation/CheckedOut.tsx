import { useRef, useState } from 'react'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { convertToArr, getCookieValue, getHomeSessionID, getSessionID } from '@/lib/utils'
import DropdownSelect from '@/components/common/DropdownSelect'
import { Button } from '@/components/ui/button'
import { CheckCheck, FolderOpen, RefreshCw } from 'lucide-react'
import axios from 'axios'

const CheckedOut = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { message } = useConstants()
	const chkRequests = convertToArr(record.check_on)
	const [selectedBarcodes, setSelectedBarcodes] = useState<string[]>([])

	const handleCheck = (barcode: string, checked: boolean) => {
		const updated = checked ? [...selectedBarcodes, barcode] : selectedBarcodes.filter((b) => b !== barcode)

		setSelectedBarcodes(updated)
		console.log(updated)
	}

	const handleCheckAll = () => {
		const allBarcodes = chkRequests.map((item) => item.barcode)
		setSelectedBarcodes(allBarcodes)
		console.log(allBarcodes)
	}

	const getImage = (item: any) => {
		let imgArr = convertToArr(item.media)
		return imgArr[0]?.im_access_link ?? ''
	}

	const onSubmit = async () => {
		const data = {
			start_susp_date: '',
			stop_susp_date: '',
			PICKUP_LOCATION: '',
			CLEAR_SUSPENSION: '',
			REQUEST_868974: 'DELETE',
		}

		const params = new URLSearchParams(data).toString()
		return await axios.post(`${getSessionID()}/16307?MANIPITEM&REPORT=WEB_LIBRARY_CIRC_DASHBOARD`, params, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		})
	}

	return (
		<div className="mb-4 rounded-md bg-white p-3 shadow">
			<div className={'pb-2 text-lg font-semibold text-gray-900'}>{`Checked Out (${record.circ_count})`}</div>
			{chkRequests.length > 0 ? (
				<>
					<div className="w-3/4 flex my-2">
						<Button onClick={onSubmit}>Renew Selected</Button>
						<Button onClick={handleCheckAll} className={'mx-1'}>
							Renew All
						</Button>
						<Button onClick={() => setSelectedBarcodes([])} className={'mx-1'}>
							<RefreshCw />
						</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{chkRequests.map((item, key) => {
							const checked = selectedBarcodes.includes(item.barcode)
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
											<input
												type="checkbox"
												className="w-5 h-5 accent-primary border-gray-300 rounded  transition-all duration-150"
												checked={checked}
												onChange={(e) => handleCheck(item.barcode, e.target.checked)}
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

export default CheckedOut
