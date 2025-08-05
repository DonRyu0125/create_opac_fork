import { useState } from 'react'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { convertToArr, getCookieValue, getHomeSessionID } from '@/lib/utils'
import DropdownSelect from '@/components/common/DropdownSelect'
import { Button } from '@/components/ui/button'
import { CheckCheck, RefreshCw } from 'lucide-react'

const RequestOn = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { message } = useConstants()
	const requests = convertToArr(record.request_on)
	const [selectedBarcodes, setSelectedBarcodes] = useState<string[]>([])

	const handleCheck = (barcode: string, checked: boolean) => {
		const updated = checked ? [...selectedBarcodes, barcode] : selectedBarcodes.filter((b) => b !== barcode)

		setSelectedBarcodes(updated)
		console.log(updated)
	}

	const handleCheckAll = () => {
		const allBarcodes = requests.map((item) => item.barcode)
		setSelectedBarcodes(allBarcodes)
		console.log(allBarcodes)
	}

	const getImage = (item: any) => {
		let imgArr = convertToArr(item.media)
		return imgArr[0].im_access_link
	}

	return (
		<div className="mb-4 rounded-md bg-white p-3 shadow">
			<div className={'pb-2 text-lg font-semibold text-gray-900'}>{`On Request (${record.wait_count})`}</div>
			<div className="w-3/4 flex my-2">
				<DropdownSelect
					className="w-1/2 mr-2"
					register={{
						onValueChange: (value) => {
							console.log('value', value)
						},
					}}
					title={'Select an option'}
					options={[
						{
							label: `Delete Requests`,
							value: 'delete',
						},
						{
							label: `Add/Modify Suspension`,
							value: 'add-mod',
						},
						{
							label: `Clear Suspensions`,
							value: 'clear',
						},
					]}
				/>
				<Button onClick={handleCheckAll} className={'mx-1'}>
					<CheckCheck />
				</Button>
				<Button onClick={() => setSelectedBarcodes([])} className={'mx-1'}>
					<RefreshCw />
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{requests.map((item, key) => {
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

								<div className="text-left font-bold max-h-[50px] overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</div>

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
		</div>
	)
}

export default RequestOn
