import { Button } from '@/components/ui/button'
import Layout from '../components/layouts'
import React, { useEffect, useState } from 'react'
import {
	CANCEL_CONFIRMATION_EMAIL_T,
	FUNC_LOC_P_GRP,
	MAIN_MWI_APPLICATION,
	MONTH_REPORT,
	NON_LOGIN_USER_TYPE,
	SISN,
	TAG_FUNC_DATE,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_ATTND,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_FIRST,
	TAG_FUNC_P_ID,
	TAG_FUNC_P_LAST,
	TAG_FUNC_START_T,
	TAG_NAME,
} from '@/components/common/event-calendar/EventCalendar'
import axios from 'axios'
import { convertToArr, convertXMLToJson, decodeObj, isDatePast } from '@/lib/utils'
import Spinner from '@/components/common/event-calendar/Spinner'
import { v4 as uuidv4 } from 'uuid'

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
	TAG_FUNC_DESCIPT: string
	occ1: string
	occ2: string
}

const STATUS_TYPE = {
	Invalid:'Invalid',
	Success:'Success',
	Confirm:'Confirm'
}

const RSVPCancelLandingPage = () => {
	const [loading, setLoading] = useState(false)
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
		TAG_FUNC_DESCIPT:''
	})
	const [status, setStatus] = useState('')

	useEffect(() => {
		checkParms()
	}, [])

	const checkParms = async () => {
		const params = new URLSearchParams(window.location.search)
		let obj: any
		params.forEach((value: string, key) => {
			obj = decodeObj(value)
		})
		let jsonObj = JSON.parse(obj)

		return await isRecordValidate(jsonObj).then((res) => {
			setLoading(false)
			if (res) {
				setPatronInfo(jsonObj)
				setStatus(STATUS_TYPE.Confirm)
				return
			}
			setStatus(STATUS_TYPE.Invalid)
			return
		})
	}

	// check the email is already registered or not
	// check the seats are available
	// check the date is available
	const isRecordValidate = async (patrons: PatronInfo) => {
		setLoading(true)
		return await axios
			.get(
				`/scripts/mwimain.dll/144/${MAIN_MWI_APPLICATION}/${MONTH_REPORT}?commandsearch&exp=${SISN} ${patrons[SISN]}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
				}
			)
			.then((res) => {
				let result = convertXMLToJson(res)
				let records = result.div.xml.event
				let recordArr = convertToArr(records) ?? []
				let event = recordArr?.filter((item) => {
					return (
						item[TAG_FUNC_DATE] === patrons[TAG_FUNC_DATE] &&
						item[TAG_FUNC_START_T] === patrons[TAG_FUNC_START_T]
					)
				})
				// there were no exsisted patron
				if (!event[0].PATRON) {
					return true
				}
				let event_arr = convertToArr(event[0].PATRON)
				let event_patron = event_arr.filter((item: PatronInfo) => {
					if (item[TAG_FUNC_P_EMAIL] === patrons[TAG_FUNC_P_EMAIL]) {
						return item
					}
				})

				if (
					event_patron.length > 1 &&
					event_patron.length < event[0].TAG_FUNC_CAP &&
					!isDatePast(event[0].TAG_FUNC_DATE)
				) {
					return true
				}

				return false
			})
			.catch((error) => {
				throw error
			})
	}

	const onClick = () => {
		setLoading(true)
		getSessionID()
			.then((res) => storeRecord(res, patronInfo))
			.then((res) => sendRegConfirmEmail(res))
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
			.catch((error) => {
				throw error
			})
	}

	const storeRecord = async (
		HOME_SESSID: string | boolean,
		PatronInfo: PatronInfo | undefined
	) => {
		const ID = `${NON_LOGIN_USER_TYPE}${uuidv4()?.substring(15)}`

		let xmlFormAdd = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_FUNC_LOC_GRP} occ="${patronInfo.occ1}" op="chg">
				<${TAG_FUNC_DTE_GRP} occ="${patronInfo.occ2}" op="chg">
					<${FUNC_LOC_P_GRP} op="add">
						<${TAG_FUNC_P_ID}>${ID}</${TAG_FUNC_P_ID}>
						<${TAG_FUNC_P_FIRST}>${patronInfo[TAG_FUNC_P_FIRST]}</${TAG_FUNC_P_FIRST}>
						<${TAG_FUNC_P_LAST}>${patronInfo[TAG_FUNC_P_LAST]}</${TAG_FUNC_P_LAST}>
						<${TAG_FUNC_P_EMAIL}>${patronInfo[TAG_FUNC_P_EMAIL]}</${TAG_FUNC_P_EMAIL}>
						<${TAG_FUNC_P_ATTND}>${patronInfo[TAG_FUNC_P_ATTND]}</${TAG_FUNC_P_ATTND}>
					</${FUNC_LOC_P_GRP}>
				</${TAG_FUNC_DTE_GRP}>
			</${TAG_FUNC_LOC_GRP}>
		</RECORD>`

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=M2L_TAG&READ=N&KEY=${SISN}&VALUE=${PatronInfo?.SISN}`,
				xmlFormAdd,
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
				setStatus(STATUS_TYPE.Invalid)
				throw error
			})
	}

	const sendRegConfirmEmail = async (HOME_SESSID: string | boolean) => {
		return await axios
			.post(
				`${HOME_SESSID}?SAVE_MAIL_FORM&TEMPLATE=[CALENDAR]RSVPRegConfirmTmp.txt&FROM_DEFAULT=noreply@minisisinc.com&TO_DEFAULT=${patronInfo[TAG_FUNC_P_EMAIL]}&SUBJECT_DEFAULT=${CANCEL_CONFIRMATION_EMAIL_T}:${patronInfo[TAG_NAME]}`,
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
				setStatus(STATUS_TYPE.Success)
				setLoading(false)
			})
			.catch((error) => {
				setStatus(STATUS_TYPE.Invalid)
				throw error
			})
	}

	const showRegStatus = () => {
		switch (status) {
			case STATUS_TYPE.Invalid:
				return <RegInvalid />
			case STATUS_TYPE.Success:
				return <RegSuccess />
			case STATUS_TYPE.Confirm:
				return <RegConfirmTmp patronInfo={patronInfo} onClick={onClick} />
			default:
				return <RegInvalid />
		}
	}

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
						{showRegStatus()}
					</div>
				)}
			</div>
		</Layout>
	)
}

const RegInvalid = () => {
	return (
		<div className="text-center">
			<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Your registration information is not valid
			</h1>

			<p className="mt-4 text-gray-500">
				The event date has expired, or you are already on the list.
			</p>

			<a
				href="#"
				className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
				Go to website
			</a>
		</div>
	)
}

const RegSuccess = () => {
	return (
		<div className="text-center">
			<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Your registration is successfully done.
			</h1>

			<p className="mt-4 text-gray-500">
				We will send you an email with the details, and you can also cancel through the
				email.
			</p>
		</div>
	)
}

const RegConfirmTmp = ({ patronInfo, onClick }:any) => {
	return (
		<div className="text-center">
			<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Please confirm your registration: {patronInfo?.TAG_NAME}
			</h1>
			<div className="mt-4 text-gray-500 sm:flex justify-evenly text-lg w-full">
				<div className="sm:w-1/2 text-left border-2 border-solid rounded-lg p-5 mx-2">
					<div>{patronInfo?.TAG_NAME}</div>
					<div>{patronInfo?.TAG_FUNC_DATE}</div>
					<div>
						{patronInfo?.TAG_FUNC_START_T} - {patronInfo?.TAG_FUNC_END_T}
					</div>
					<div>
						{patronInfo?.BRANCH_ADDRESS}, Room: {patronInfo?.TAG_FUNC_ROOM}
					</div>
				</div>
				<div className="sm:w-1/2 text-left border-2 border-solid rounded-lg p-5 mx-2">
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
				className="flex items-center justify-center w-[300px] h-[50px] mt-6 inline-block rounded bg-green-600 text-lg font-bold text-white hover:bg-indigo-700 focus:outline-none focus:ring">
				<div>Confirm</div>
			</Button>
		</div>
	)
}

export default RSVPCancelLandingPage
