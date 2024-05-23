import { Button } from '@/components/ui/button'
import Layout from '../components/layouts'
import React, { useEffect, useState } from 'react'
import {
	CANCEL_CONFIRMATION_EMAIL_T,
	FUNC_LOC_P_GRP,
	MAIN_MWI_APPLICATION,
	MONTH_REPORT,
	SISN,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_ID,
	TAG_NAME,
} from '@/components/common/event-calendar/EventCalendar'
import axios from 'axios'
import { convertXMLToJson, decodeObj } from '@/lib/utils'
import Spinner from '@/components/common/event-calendar/Spinner'

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
	REGISTERED_DATE: string
	BRANCH_ADDRESS: string
	occ1: string
	occ2: string
}

const RSVPCancelLandingPage = () => {
	const [loading, setLoading] = useState(true)
	const [patronInfo, setPatronInfo] = useState<PatronInfo>({
		TAG_FUNC_P_ATTND: '',
		TAG_FUNC_P_FIRST: '',
		TAG_FUNC_P_LAST: '',
		TAG_FUNC_P_EMAIL: '',
		TAG_NAME: '',
		TAG_FUNC_START_T: '',
		TAG_FUNC_END_T: '',
		TAG_FUNC_ROOM: '',
		TAG_FUNC_DATE: '',
		TAG_FUNC_LOC: '',
		SISN: '',
		TAG_FUNC_P_ID: '',
		REGISTERED_DATE: '',
		BRANCH_ADDRESS: '',
		occ1: '',
		occ2: '',
	})
	const [registerd, setRegistered] = useState(true)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		let obj: any
		params.forEach((value: string, key) => {
			obj = decodeObj(value)
		})
		let jsonObj = JSON.parse(obj)
		setPatronInfo(jsonObj)
		isRecord(jsonObj.TAG_FUNC_P_ID).then((res) => {
			setLoading(false)
			if (res) {
				return setRegistered(true)
			}
			setRegistered(false)
		})
	}, [])

	const isRecord = async (id: string) => {
		setLoading(true)
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
		setLoading(true)
		getSessionID()
			.then((res) => removeRecord(res, patronInfo))
			.then((res) => sendCancelConfirmEmail(res))
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

	const removeRecord = async (
		HOME_SESSID: string | boolean,
		PatronInfo: PatronInfo | undefined
	) => {
		let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
    <RECORD>
      <${TAG_FUNC_LOC_GRP} occ="${PatronInfo?.occ1}" op="chg">
        <${TAG_FUNC_DTE_GRP} occ="${PatronInfo?.occ2}" op="chg">
          <${FUNC_LOC_P_GRP} op="del" search="${PatronInfo?.TAG_FUNC_P_ID}">
          </${FUNC_LOC_P_GRP}>
        </${TAG_FUNC_DTE_GRP}>
      </${TAG_FUNC_LOC_GRP}>
    </RECORD>`

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=M2L_TAG&READ=N&KEY=${SISN}&VALUE=${PatronInfo?.SISN}`,
				xmlFormDelete,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((res) => {
				return HOME_SESSID
			})
			.catch((error) => {
				// error
				setRegistered(true)
				return ''
			})
	}

	const sendCancelConfirmEmail = async (HOME_SESSID: string | boolean) => {
		return await axios
			.post(
				`${HOME_SESSID}?SAVE_MAIL_FORM&TEMPLATE=[CALENDAR]RSVPCancelConfirmEmailTmp.txt&FROM_DEFAULT=noreply@minisisinc.com&TO_DEFAULT=${patronInfo[TAG_FUNC_P_EMAIL]}&SUBJECT_DEFAULT=${CANCEL_CONFIRMATION_EMAIL_T}:${patronInfo[TAG_NAME]}`,
				{
					...patronInfo,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then((res) => {
				setRegistered(false)
				setLoading(false)
			})
	}

	const showRegister = () => {
		return (
			<>
				{registerd ? (
					<div className="text-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							This will cancel your registration for {patronInfo?.TAG_NAME}
						</h1>
						<div className="mt-4 text-gray-500 sm:flex text-lg w-full">
							<div className="text-left border-2 border-solid rounded-lg p-5 mx-2">
								<div>{patronInfo?.TAG_NAME}</div>
								<div>{patronInfo?.TAG_FUNC_DATE}</div>
								<div>
									{patronInfo?.TAG_FUNC_START_T} - {patronInfo?.TAG_FUNC_END_T}
								</div>
								<div>
									{patronInfo?.BRANCH_ADDRESS}, Room: {patronInfo?.TAG_FUNC_ROOM}
								</div>
							</div>
							<div className="text-left border-2 border-solid rounded-lg p-5 mx-2">
								<div>
									{patronInfo?.TAG_FUNC_P_LAST}, {patronInfo?.TAG_FUNC_P_FIRST}
								</div>
								<div>{patronInfo?.TAG_FUNC_P_EMAIL}</div>
								<div>Registered: {patronInfo?.REGISTERED_DATE}</div>
								<div className="border-2 border-dashed p-2">
									{patronInfo?.TAG_FUNC_P_ATTND} spot reserved
								</div>
							</div>
						</div>
						<Button
							onClick={onClick}
							className="flex items-center justify-center w-[300px] h-[50px] mt-6 inline-block rounded bg-red-600 text-lg font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring">
							<div>Unregister</div>
						</Button>
					</div>
				) : (
					<div className="text-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							You are not in the list !
						</h1>

						<p className="mt-4 text-gray-500">Please go to our website to register.</p>

						<a
							href="#"
							className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
							Search Events
						</a>
					</div>
				)}
			</>
		)
	}

	// const ID = `${NON_LOGIN_USER_TYPE}${uuidv4().substring(15)}`
	// let xmlFormAdd = `<?xml version="1.0" encoding="UTF-8"?>
	// 	<RECORD>
	// 		<${TAG_FUNC_LOC_GRP} occ="${TAG_FUNC_LOC_OCC}" op="chg">
	// 			<${TAG_FUNC_DTE_GRP} occ="${TAG_FUNC_DTE_OCC}" op="chg">
	// 				<${FUNC_LOC_P_GRP} op="add">
	// 					<${TAG_FUNC_P_ID}>${ID}</${TAG_FUNC_P_ID}>
	// 					<${TAG_FUNC_P_FIRST}>${data[TAG_FUNC_P_FIRST]}</${TAG_FUNC_P_FIRST}>
	// 					<${TAG_FUNC_P_LAST}>${data[TAG_FUNC_P_LAST]}</${TAG_FUNC_P_LAST}>
	// 					<${TAG_FUNC_P_EMAIL}>${data[TAG_FUNC_P_EMAIL]}</${TAG_FUNC_P_EMAIL}>
	// 					<${TAG_FUNC_P_ATTND}>${data[TAG_FUNC_P_ATTND]}</${TAG_FUNC_P_ATTND}>
	// 				</${FUNC_LOC_P_GRP}>
	// 			</${TAG_FUNC_DTE_GRP}>
	// 		</${TAG_FUNC_LOC_GRP}>
	// 	</RECORD>`

	return (
		<Layout>
			<div className="flex h-full flex-col bg-white h-[800px]">
				<img
					src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
					alt=""
					className="h-64 w-full object-cover"
				/>
				{loading ? (
					<div className={'h-[500px]'}>
						<Spinner
							height={'h-full'}
							spinHeight={'h-20'}
							spinWidth={'w-20'}
							background={'bg-white'}
						/>
					</div>
				) : (
					<div className={'h-[500px] flex items-center justify-center'}>
						{showRegister()}
					</div>
				)}
			</div>
		</Layout>
	)
}

export default RSVPCancelLandingPage
