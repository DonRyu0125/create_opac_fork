import Link from '@/components/common/Link'
import Layout from '@/components/layouts'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { Archive, CircleCheck, Landmark, LibraryBig } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const REQUEST_DESC_DB = 'DESCRIPTION'

const RequestConfirmed = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const { config } = useConstants()
	const { navigations } = config
	let reqData: any = records[0].request
	let container = reqData.container
	const { message } = useConstants()

	return (
		<Layout>
			<section>
				<div className="bg-gray-50 min-h-screen py-10">
					<div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
						{/* Header */}
						<div className="flex justify-between items-center border-b pb-4">
							<h1 className="flex items-center text-xl font-bold">
								<CircleCheck className="mr-2 text-green-500" />
								{message.request} {message.confirmed}
							</h1>
						</div>
						<div className="py-4 [&_p]:my-4 [&_b]:text-lg [&_b]:underline">
							<p>
								{message.requestFor} <b>{reqData.req_item_title ?? reqData.req_title}</b> - <b>{reqData.req_item_id}</b>
							</p>
							<p>{reqData.sentence_1}</p>
							<p>
								<b>{reqData.collection_time}</b>
							</p>
							<p> {message.visitRequirement}</p>
						</div>

						{reqData.req_db_name && (
							<div>
								<div className="border p-4 rounded">
									{reqData.req_db_name === REQUEST_DESC_DB ? (
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
						)}

						<div className="border-t mt-6">
							<div className="flex justify-center items-center pt-4">
								<Link className="mx-1" href={reqData.req_back_to_record}>
									<Button>{message.goBack}</Button>
								</Link>
								{navigations.map((item) => (
									<Link className="mx-1" href={item.url}>
										<Button>{item.title}</Button>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}

export default RequestConfirmed
