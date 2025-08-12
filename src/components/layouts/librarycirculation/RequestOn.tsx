import { useRef, useState } from 'react'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { convertToArr, getCookieValue, getHomeSessionID, getSessionID } from '@/lib/utils'
import DropdownSelect from '@/components/common/DropdownSelect'
import { Button } from '@/components/ui/button'
import { CheckCheck, FolderOpen, RefreshCw } from 'lucide-react'
import RequestModal from './RequestModal'

const RequestOn = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { message } = useConstants()
	const requests = convertToArr(record.request_on)
	const[selectOption, setSelectOption] = useState<string>('')
	const [selectedId, setselectedId] = useState<string[]>([])

	const getImage = (item: any) => {
		let imgArr = convertToArr(item.media)
		return imgArr[0].im_access_link
	}

	const handleCheck = (id: string, checked: boolean) => {
		const updated = checked ? [...selectedId, id] : selectedId.filter((b) => b !== id)
		setselectedId(updated)
		console.log(updated)
	}

	const handleCheckAll = () => {
		const allID = requests.map((item) => item.id)
		setselectedId(allID)
		console.log(allID)
	}

	return (
		<div className="mb-4 rounded-md bg-white p-3 shadow  ">
			<div className={'pb-2 text-lg font-semibold text-gray-900'}>{`On Request (${record.wait_count})`}</div>
			{requests.length > 0 ? (
				<>
					<div className="w-3/4 flex my-2">
						<DropdownSelect
							className="w-1/2 mr-2"
							register={{
								onValueChange: (value) => setSelectOption(value)
							}}
							title={'Select an option'}
							options={[
								{
									label: `Add/Modify Suspension`,
									value: 'CHANGE',
								},
								{
									label: `Clear Suspensions`,
									value: 'CLEAR',
								},
							]}
						/>
						<RequestModal selectedId={selectedId} selectOption={selectOption} sisn={record.sisn} />
						<Button onClick={handleCheckAll} className={'mx-1'}>
							Select All
						</Button>
						<Button onClick={() => setselectedId([])} className={'mx-1'}>
							<RefreshCw />
						</Button>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-h-[830px] overflow-y-auto">
						{requests.map((item, key) => {
							const checked = selectedId.includes(item.id)
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
												onChange={(e) => handleCheck(item.id, e.target.checked)}
											/>
										</div>
										<div className="text-left font-bold h-[70px] overflow-hidden text-ellipsis">{item.title}</div>
										<div>
											<div className="flex justify-between">
												<span className="text-gray-500">Barcode</span>
												<span className="text-gray-900 font-medium">{item.barcode}</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-500">Wait position</span>
												<span className="text-gray-900 font-medium">
													{item.occnum} of {item.occurence}
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-500">Requested on</span>
												<span className="text-gray-900 font-medium">{item.wait_date}</span>
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

export default RequestOn
