import { Button } from '@/components/ui/button'
import Layout from '../components/layouts'
import React, { useEffect, useState } from 'react'
import {
	FUNC_LOC_P_GRP,
	MAIN_MWI_APPLICATION,
	MONTH_REPORT,
	SISN,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_ID,
} from '@/components/common/event-calendar/EventCalendar'
import axios from 'axios'
import { convertXMLToJson, decodeObj } from '@/lib/utils'
import { encode } from 'punycode'

type PatronInfo = {
	TAG_FUNC_P_ATTND: string
	TAG_FUNC_P_FIRST: string
	TAG_FUNC_P_LAST: string
	TAG_FUNC_P_EMAIL: string
	TAG_NAME: string
	TAG_FUNC_START_T: string
	TAG_FUNC_END_T: string
	TAG_FUNC_ROOM: string
	TAG_FUNC_DATE: string
	TAG_FUNC_LOC: string
	SISN: string
	TAG_FUNC_P_ID: string
	CURRENT_DATE: string
	BRANCH_ADDRESS: string
	occ1: string
	occ2: string
}

const RSVP = () => {
	const [patronInfo, setPatronInfo] = useState<PatronInfo>()
	const [registerd, setRegistered] = useState(true)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		let obj: any
		params.forEach((value: string, key) => {
			obj = decodeObj(value)
		})

		setPatronInfo(JSON.parse(obj))
		isRecord(obj.TAG_FUNC_P_ID).then((res) => {
			if (res) {
				return setRegistered(true)
			}
			setRegistered(false)
		})
	}, [])

	const isRecord = async (id: string) => {
		return await axios
			.get(
				`/scripts/mwimain.dll/144/${MAIN_MWI_APPLICATION}/${MONTH_REPORT}?commandsearch&exp=${TAG_FUNC_P_ID} ${id}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
				}
			)
			.then((res) => {
				let result = convertXMLToJson(res)
				if (result.div) {
					return true
				}
				return false
			})
	}

	const onClick = () => {
		// getSessionID()
		// 	.then((res) => removeRecord(res, patronInfo))
		// 	.then((res) => sendCancelConfirmEmail(res))
	}

	const getSessionID = async () => {
		let urlForSessionID = `/scripts/mwimain.dll?logon&application=${MAIN_MWI_APPLICATION}`

		return await axios
			.post(
				urlForSessionID,
				{},
				{
					headers: {
						'Content-Type': 'text/xml',
					},
				}
			)
			.then(() => {
				let match = document.cookie.match(/HOME_SESSID=(http:\/\/[^;]+)/) ?? ''
				let HOME_SESSID = match[0]?.split('=')[1]
				return HOME_SESSID
			})
			.catch(() => {
				return false
			})
	}

	const removeRecord = async (HOME_SESSID: string | boolean, obj: PatronInfo | undefined) => {
		let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
    <RECORD>
      <${TAG_FUNC_LOC_GRP} occ="${obj?.occ1}" op="chg">
        <${TAG_FUNC_DTE_GRP} occ="${obj?.occ2}" op="chg">
          <${FUNC_LOC_P_GRP} op="del" search="${obj?.TAG_FUNC_P_ID}">
          </${FUNC_LOC_P_GRP}>
        </${TAG_FUNC_DTE_GRP}>
      </${TAG_FUNC_LOC_GRP}>
    </RECORD>`

		return await axios
		// .post(
		// 	`${HOME_SESSID}?manipxmlrecord&database=M2L_TAG&READ=N&KEY=${SISN}&VALUE=${obj?.SISN}`,
		// 	xmlFormDelete,
		// 	{
		// 		headers: {
		// 			'Content-Type': 'text/xml',
		// 		},
		// 		timeout: 5000,
		// 	}
		// )
		// .then((res) => {
		// 	// setRegistered 가 VALID 할때만 작동하게 할것
		// 	let result = convertXMLToJson(res)
		// 	setRegistered(false)
		// 	return HOME_SESSID;
		// })
		// .catch((error) => {
		// 	// error
		// 	setRegistered(true)
		// })
	}

	// const sendCancelConfirmEmail = async (HOME_SESSID:string) => {
	// 	return await axios
	// 		.post(
	// 			`${HOME_SESSID}?SAVE_MAIL_FORM&TEMPLATE=[CALENDAR]RSVPConfirmEmailTmp.txt&FROM_DEFAULT=noreply@minisisinc.com&TO_DEFAULT=${data[TAG_FUNC_P_EMAIL]}&SUBJECT_DEFAULT=${CONFIRMATION_EMAIL_T}${event[TAG_NAME]}`,
	// 			{
	// 				// ...data,
	// 				// ...event,
	// 				// CURRENT_DATE: getCurrentDate(),
	// 				// BRANCH_ADDRESS: getContactInfo(BRANCH_ADDRESS),
	// 				// CANCEL_URL: RSVP_CANCEL_LANDING_PAGE_URL,
	// 				// occ1: patron.occ1,
	// 				// occ2: patron.occ2,
	// 				// TAG_FUNC_P_ID: patron.id
	// 			},
	// 			{
	// 				headers: {
	// 					'Content-Type': 'multipart/form-data',
	// 				},
	// 			}
	// 		)
	// 		.then(() => {})
	// }

	return (
		<Layout>
			<div className="flex h-screen flex-col bg-white">
				<img
					src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
					alt=""
					className="h-64 w-full object-cover"
				/>
				<div className="flex flex-1 items-center justify-center">
					{registerd ? (
						<div className="mx-auto max-w-xl px-4 py-8 text-center">
							<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								This will cancel your registration for {patronInfo?.TAG_NAME}
							</h1>
							<p className="mt-4 text-gray-500">
								Try searching again, or return home to start from the beginning.
							</p>
							<Button
								onClick={onClick}
								className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
								Unregister
							</Button>
						</div>
					) : (
						<div className="mx-auto max-w-xl px-4 py-8 text-center">
							<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								You are not in the list !
							</h1>
							<h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
								Please go to our website to register again
							</h2>
							<p className="mt-4 text-gray-500">Website name</p>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default RSVP
