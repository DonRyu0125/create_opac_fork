import { useState, useRef } from 'react'
import useConstants from '@/hooks/useConstants'
import useJSONData from '@/hooks/useJSONData'
import { copyRecordURL, deepSearchKey, handleCopyRecordURL } from '@/lib/record'
import { ChevronLeft, ChevronRight, Files, Copy, ShoppingBag } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import DialogLogin from '../../components/common/DialogLogin'
import TooltipButton from '@/components/common/TooltipButton'
import { getCookieValue, getHomeSessionID } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const DetailRecordAction = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const formRef = useRef<HTMLFormElement | null>(null)
	const { toast } = useToast()
	const { nextRecord, previousRecord, records } = useJSONData({ selector: '#xml_record' })
	const { message } = useConstants()
	const record = records[0]
	const requestData = record?.request
	const sisn = deepSearchKey(record, 'sisn')[0] as string
	const database = record.database_name
	const handleSubmit = (action: string | null) => {
		if (checkLoggedInToRequest( action )){
			const { refd, accession_number, title: recordTitle, legal_title: recordLegalTitle } = record.record;
			const itemid = refd || accession_number || "";
    		const title = recordLegalTitle || recordTitle || "";
			switch(action) {
				case "Request":
					if (formRef.current) {
						formRef.current.submit()
					} else {
						console.log('Request Error')
					}
					break;
				case "Enquire":
					const url = `${getHomeSessionID()}?ADDSINGLERECORD&DATABASE=ENQUIRIES_VIEW&DE_FORM=[OPAC_ENQUIRY]de_enquiryform.html&subject=${record.record.title}`;
					window.location.href = url;
					break;
				case "Reproduction":
					const reprodURL = `${getHomeSessionID()}?ADDSINGLERECORD&DATABASE=REQUEST_VIEW&DE_FORM=[OPAC_REPROD]de_reproductionform.html&title=${title}&itemid=${itemid}`;
					window.location.href = reprodURL;
					break;
				case "Copyright":
					const copyrightURL = `${getHomeSessionID()}?ADDSINGLERECORD&DATABASE=REQUEST_COPY_VIEW&DE_FORM=[OPAC_COPYRIGHT]de_copyrightform.html&title=${title}&itemid=${itemid}&dbname=${database.split("_")[0]}`;
					window.location.href = copyrightURL;
					break;
			}
		} else {
			if(action === "Enquire") { 
				const url = `${getHomeSessionID()}?ADDSINGLERECORD&DATABASE=ENQUIRIES_VIEW&DE_FORM=[OPAC_ENQUIRY]de_enquiryform.html&subject=${record.record.title}`;
				window.location.href = url;
			}
		}
	}

	const goToURL = (url: string | null) => {
		if (url) window.location.href = url
	}

	const checkRecordHasMandatoryDataToRequest = () => {
		const checkRecord = record.record
		const recordRequestBool = 'Yes' as string
		let requestable = false as boolean
		checkRecord?.a_avail === recordRequestBool ||
		checkRecord?.m_avail === recordRequestBool ||
		checkRecord?.l_avail === recordRequestBool
			? (requestable = true)
			: (requestable = false)
		return requestable
	}

	const checkIfCurrentClientRequestedThisRecord = () => {
		const recordRequested = record.record?.is_requested_by_client
		let currentClientRequested = false
		if (recordRequested === 'Current') {
			currentClientRequested = true
		}
		return currentClientRequested
	}

	const checkLoggedInToRequest = (action: string | null) => {
		let isLoggedIn = false
		const patronID = getCookieValue('M2L_PATRON_ID')?.split(']')[1]
		if ((patronID === null || patronID === undefined || patronID === '') && action !== "Enquire") {
			setIsModalOpen(true)
		} else {
			isLoggedIn = true
		}
		return isLoggedIn
	}

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex flex-col md:flex-row justify-between gap-2">
				<TooltipButton
					tooltipContent="Previous record"
					className="align-center"
					disabled={!previousRecord}
					onClick={() => goToURL(previousRecord)}>
					<ChevronLeft />
					<span className="hidden md:block">{message.previous}</span>
				</TooltipButton>

				<div className="flex space-x-2">
					{checkRecordHasMandatoryDataToRequest() 
					&& checkIfCurrentClientRequestedThisRecord() 
					? 
					<TooltipButton
						tooltipContent="Request Record"
						variant="outline"
						onClick={() => handleSubmit("Request")}
					>
						<ShoppingBag className="w-4 h-4 mr-2 hidden md:block" /> {message.detailRecordActionRequest}
						<form method="post" ref={formRef} action={getHomeSessionID() + "/1/" + record.request.req_db_link2 + "?REQUESTLOGIN&DBNAME=" + record.request.req_db_name} className='hidden'>
							<Input type="hidden" name="ITEM_REQ_TIME" value={requestData.item_req_time}/>
							<Input type="hidden" name="METHOD_REQUEST" value={requestData.method_request}/>
							<Input type="hidden" name="REQ_TOPIC" value={requestData.req_topic}/>
							<Input type="hidden" name="REQ_APPL_NAME" value={requestData.req_appl_name}/>
							<Input type="hidden" name="REQ_DB_NAME" value={ requestData.req_db_name}/>
							<Input type="hidden" name="REQ_DB_LINK2" value={requestData.req_db_link2}/>
							<Input type="hidden" name="REQ_QUEUE" value={requestData.req_queue}/>
							<Input type="hidden" name="REQ_DB_RECID" value={requestData.req_db_recid}/>
							<Input type="hidden" name="REQ_TITLE" value={requestData.req_title}/>
							<Input type="hidden" name="REQ_ITEM_ID" value={requestData.req_item_id}/>
							<Input type="hidden" name="REQ_ACC_NUMBER" value={requestData.req_acc_number}/>
							<Input type="hidden" name="REQ_ITEM_TITLE" value={requestData.req_item_title}/>
							<Button
								className="bg-opac-darkblue"
								type="submit"
								variant="default">
								Submit
							</Button>
						</form>
					</TooltipButton> : <TooltipButton
						tooltipContent="Request Record"
						variant="outline"
						disabled>
						<ShoppingBag className="w-4 h-4 mr-2 hidden md:block" /> {message.detailRecordActionRequest}
					</TooltipButton>}

					<TooltipButton
						tooltipContent="Ask about this record"
						variant="outline"
						onClick={() => handleSubmit('Enquire')}>
						<ShoppingBag className="w-4 h-4 mr-2 hidden md:block" />
						{message.detailRecordActionEnquire}
					</TooltipButton>
					<TooltipButton
						tooltipContent="Reproduce this record"
						variant="outline"
						onClick={() => handleSubmit('Reproduction')}>
						<Files className="w-4 h-4 mr-2 hidden md:block" />
						{message.detailRecordActionReproduction}
					</TooltipButton>
					<TooltipButton
						tooltipContent="Copyright this record"
						variant="outline"
						onClick={() => handleSubmit("Copyright")}
					>
						<Files className="w-4 h-4 mr-2 hidden md:block" /> {message.detailRecordActionCopyright}
					</TooltipButton>
					<TooltipButton
						tooltipContent="Copy record URL"
						variant="outline"
						onClick={() => {
							handleCopyRecordURL(record)
							toast({
								title: message.recordIsCopied,
							})
						}}>
						<Copy className="w-4 h-4 mr-2 hidden md:block" /> {message.copy}
					</TooltipButton>
				</div>

				<TooltipButton
					tooltipContent="Next record"
					className="align-center"
					disabled={!nextRecord}
					onClick={() => goToURL(nextRecord)}>
					<span className="hidden md:block">{message.next}</span>
					<ChevronRight />
				</TooltipButton>
			</div>
			<DialogLogin open={isModalOpen} onOpenChange={setIsModalOpen} />
		</div>
	)
}

export default DetailRecordAction
