import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import RequestDescLater from './requst-later-desc'

type ItemContent = {
	id: string
	item_type: string
	aone_loc: string
	aone_status: string
	location_details: string
	ref_code: string
}

const ITEMS_PER_PAGE = 20

const RequestAccordian = ({ items }: { items: { title: string }[] }) => {
	const { message } = useConstants()
	const { records } = useJSONData({ selector: '#xml_record' })
	const record = records[0]
	const { container } = record

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
			{ threshold: 1.0 }
		)
		if (loadMoreRef.current) observer.observe(loadMoreRef.current)
		return () => observer.disconnect()
	}, [openIndex])

	console.log('cc', container.item)
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
						<ChevronDown
							className={cn(
								'w-5 h-5 transition-transform duration-200',
								openIndex === index && 'transform rotate-180'
							)}
						/>
					</Button>
					{openIndex === index && (
						<div id={`accordion-content-${index}`} className="p-4 pt-0">
							<div className="overflow-auto max-h-[400px]">
								<table className="min-w-full text-sm border">
									<thead className="bg-gray-100 sticky top-0 z-10">
										<tr>
											<th className="border px-4 py-2 text-left font-medium text-gray-700">
												Barcode ID
											</th>
											<th className="border px-4 py-2 text-left font-medium text-gray-700">
												{message.location}
											</th>
											<th className="border px-4 py-2 text-left font-medium text-gray-700">
												{message.type}
											</th>
											<th className="border px-4 py-2" />
										</tr>
									</thead>
									<tbody>
										{container &&
											container.item
												.slice(0, visibleCounts[index] || 0)
												.map((value: ItemContent, idx: number) => (
													<tr key={value.id}>
														<td className="border px-4 py-2">
															{value.id}
														</td>
														<td className="border px-4 py-2">
															{value.location_details}
														</td>
														<td className="border px-4 py-2">
															{value.item_type}
														</td>
														<td className="border px-4 py-2">
															{<RequestDescLater />}
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

export default RequestAccordian
