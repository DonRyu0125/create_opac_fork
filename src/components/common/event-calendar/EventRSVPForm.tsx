import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import X2JS from 'x2js'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import {
	BRANCH_ADDRESS,
	BRANCH_NAME,
	BRANCH_PHONE,
	CONFIRMATION_EMAIL_T,
	Cal_event,
	ContactInfo,
	FUNC_LOC_P_GRP,
	MAIN_MWI_APPLICATION,
	PATRON,
	SISN,
	SUB_MWI_APPLICATION,
	TAG_FUNC_DATE,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_ATTND,
	TAG_FUNC_P_ATTND_DEFAULT,
	TAG_FUNC_P_ATTND_MAX,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_FIRST,
	TAG_FUNC_P_ID,
	TAG_FUNC_P_LAST,
	TAG_FUNC_P_PAID,
	TAG_FUNC_START_T,
	TAG_NAME,
	patron,
} from './EventCalendar'
import { BadgeCheck, SquareUserRound } from 'lucide-react'
import { convertLowerTrim, convertToArr, getCurrentDate } from '@/lib/utils'
import x2js from 'x2js'

type Inputs = {
	[TAG_FUNC_P_FIRST]: string
	[TAG_FUNC_P_LAST]: string
	[TAG_FUNC_P_EMAIL]: string
	[TAG_FUNC_P_ATTND]: number
}

type EventInput = {
	label: string
	keyname: string
	register: Function
	required: boolean
}

type EventRSVPForm = {
	capacity: number
	patrons: patron[]
	sisnNumber: number
	event: Cal_event
	contactInfo: ContactInfo[]
}

const MWI_RESFUL_RES = 'MWI-RESTful-response'
const SUCCESS_RES_CODE = 0
const MWI_XML_DATA_INDEX = 0
const NON_LOGIN_USER_TYPE = 'NOLOGIN'

const EventInput = ({ label, keyname, register, required }: EventInput) => {
	return (
		<div className={'flex w-full flex-col my-1'}>
			<Label>{label}</Label>
			<Input
				className={'border-2 border-grey-500'}
				{...register(keyname, { required: required })}
			/>
		</div>
	)
}

const EventRSVPForm = ({ capacity, patrons, sisnNumber, event, contactInfo }: EventRSVPForm) => {
	const [showForm, setShowForm] = useState(false)
	const { register, handleSubmit, reset } = useForm<Inputs>()
	const x2js = new X2JS()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		let urlForSessionID = `/scripts/mwimain.dll?logon&application=${MAIN_MWI_APPLICATION}`
		// mwi logon function
		// 20240510 Richard said, calendar can't be the stand alone function so it will required the logon before using it
		// 20240510 logon => storing data process optimization is not developed
		return axios
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
				return getRecord(data)
					.then((res) => storePatron(res))
					.then((res) => {
						if (res.err == SUCCESS_RES_CODE) {
							return sendEmail(res, data, event)
						}
						console.log('this is error an storePatron')
						onReset()
					})
					.catch((error) => {
						console.log('this is error an getRecord')
						onReset()
					})
			})
			.catch((error) => {
				console.error('Error fetching session ID:', error)
			})
	}

	const getRecord = async (data: Inputs) => {
		let match = document.cookie.match(/HOME_SESSID=(http:\/\/[^;]+)/) ?? ''
		let HOME_SESSID = match[0]?.split('=')[1]

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=M2L_TAG&READ=Y&KEY=${SISN}&VALUE=${sisnNumber}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((res) => {
				const conToJson: any = x2js.xml2js(res.data)
				const jsonObj = conToJson[MWI_RESFUL_RES].record
				const loc_group = convertToArr(jsonObj.TAG_FUNC_LOC_GRP)
				const dte_group = convertToArr(loc_group[MWI_XML_DATA_INDEX].TAG_FUNC_DTE_GRP)
				const ID = `${NON_LOGIN_USER_TYPE}${uuidv4().substring(15)}`
				let TAG_FUNC_LOC_OCC = 0
				let TAG_FUNC_DTE_OCC = 0

				loc_group?.forEach((elm) => {
					const funcLoc = elm?.TAG_FUNC_LOC
					if (funcLoc === event[TAG_FUNC_LOC]) {
						TAG_FUNC_LOC_OCC = elm._occ // regards as Occurence number of the repeating field
					}
				})

				dte_group?.forEach((elm) => {
					const funcDate = elm?.TAG_FUNC_DATE
					const funcTimeStart = elm?.TAG_FUNC_START_T
					if (
						funcDate === event[TAG_FUNC_DATE] &&
						funcTimeStart === event[TAG_FUNC_START_T]
					) {
						TAG_FUNC_DTE_OCC = elm._occ
					}
				})

				let xmlFormAdd = `<?xml version="1.0" encoding="UTF-8"?>
					<RECORD>
						<${TAG_FUNC_LOC_GRP} occ="${TAG_FUNC_LOC_OCC}" op="chg">
							<${TAG_FUNC_DTE_GRP} occ="${TAG_FUNC_DTE_OCC}" op="chg">
								<${FUNC_LOC_P_GRP} op="add">
									<${TAG_FUNC_P_ID}>${ID}</${TAG_FUNC_P_ID}>
									<${TAG_FUNC_P_FIRST}>${data[TAG_FUNC_P_FIRST]}</${TAG_FUNC_P_FIRST}>
									<${TAG_FUNC_P_LAST}>${data[TAG_FUNC_P_LAST]}</${TAG_FUNC_P_LAST}>
									<${TAG_FUNC_P_EMAIL}>${data[TAG_FUNC_P_EMAIL]}</${TAG_FUNC_P_EMAIL}>
									<${TAG_FUNC_P_ATTND}>${data[TAG_FUNC_P_ATTND]}</${TAG_FUNC_P_ATTND}>
								</${FUNC_LOC_P_GRP}>
							</${TAG_FUNC_DTE_GRP}>
						</${TAG_FUNC_LOC_GRP}>
					</RECORD>`
				return { xmlFormAdd, occ1: TAG_FUNC_LOC_OCC, occ2: TAG_FUNC_DTE_OCC, id: ID }
			})
			.catch((error) => {
				console.error('Getting record error', error)
				return { xmlFormAdd: '', occ1: 0, occ2: 0 }
			})
	}

	const storePatron = async (patron: { xmlFormAdd: string; occ1: string; occ2: string }) => {
		let match = document.cookie.match(/HOME_SESSID=(http:\/\/[^;]+)/) ?? ''
		let HOME_SESSID = match[0]?.split('=')[1]
		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=M2L_TAG&READ=N&KEY=${SISN}&VALUE=${sisnNumber}`,
				patron.xmlFormAdd,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((res) => {
				const errJson: any = x2js.xml2js(res.data)
				return {
					err: errJson[MWI_RESFUL_RES].error,
					occ1: patron.occ1,
					occ2: patron.occ2,
				}
			})
			.catch((error) => {
				return {
					err: false,
				}
			})
	}

	const sendEmail = async (patron: any, data: any, event: Cal_event) => {
		let match = document.cookie.match(/HOME_SESSID=(http:\/\/[^;]+)/) ?? ''
		let HOME_SESSID = match[0]?.split('=')[1]
		let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
					<RECORD>
						<${TAG_FUNC_LOC_GRP} occ="${patron.occ1}" op="chg">
							<${TAG_FUNC_DTE_GRP} occ="${patron.occ2}" op="chg">
								<${FUNC_LOC_P_GRP} op="delete" search="${patron.ID}">
								</${FUNC_LOC_P_GRP}>
							</${TAG_FUNC_DTE_GRP}>
						</${TAG_FUNC_LOC_GRP}>
					</RECORD>`

		console.log('getContactInfo(BRANCH_ADDRESS)', getContactInfo(BRANCH_ADDRESS))
		return await axios
			.post(
				`${HOME_SESSID}?SAVE_MAIL_FORM&TEMPLATE=[CALENDAR]RsvpForm.txt&FROM_DEFAULT=noreply@minisisinc.com&TO_DEFAULT=${data[TAG_FUNC_P_EMAIL]}&SUBJECT_DEFAULT=${CONFIRMATION_EMAIL_T}${event[TAG_NAME]}`,
				{
					...data,
					...event,
					currentDate: getCurrentDate(),
					BRANCH_ADDRESS: getContactInfo(BRANCH_ADDRESS),
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then(() => {
				onReset()
			})
	}

	const onReset = () => {
		setShowForm((prev) => !prev)
		reset()
	}

	const calNumOfPatron = (patrons: patron[]) => {
		const totalPatronAttnd = patrons?.reduce((total: number, entry: patron) => {
			if (entry && entry[TAG_FUNC_P_ATTND] !== undefined) {
				return total + parseInt(entry[TAG_FUNC_P_ATTND], 10)
			}
			return total
		}, 0)
		return totalPatronAttnd ?? 0
	}

	const getContactInfo = (type: string) => {
		let info: any = contactInfo?.filter((item) => {
			return convertLowerTrim(item[BRANCH_NAME]) === convertLowerTrim(event[TAG_FUNC_LOC])
		})
		if (info) {
			let contact = info[0]
			return contact[type]
		}
		return ''
	}

	return (
		<div className={`flex justify-center w-full h-full`}>
			{!showForm && (
				<div className={'w-full p-2'}>
					<div
						className={
							'w-full h-3/6 flex flex-col items-center justify-evenly space-evenly border-b-4'
						}>
						<div className={'flex'}>
							<SquareUserRound /> Registration Required
						</div>
						<Button
							disabled={capacity - calNumOfPatron(patrons) === 0 ? true : false}
							className={'w-full '}
							onClick={onReset}>{`Register`}</Button>
						<div className={'flex items-center justify-center'}>
							{capacity - calNumOfPatron(patrons) === 0 ? (
								<div className={'flex text-red-600 items-center'}>
									No Seats are remaining
								</div>
							) : (
								<div className={'flex text-lime-800 items-center'}>
									<BadgeCheck />{' '}
									{`${capacity - calNumOfPatron(patrons)} seats remaining`}
								</div>
							)}
						</div>
					</div>
					<div className={'h-3/6 flex flex-col items-center justify-center '}>
						<div>Contact Info</div>
						<div>Address: {getContactInfo(BRANCH_ADDRESS)}</div>
						<div>Phone: {getContactInfo(BRANCH_PHONE)}</div>
					</div>
				</div>
			)}
			{showForm && (
				<div className={'h-5/6 w-full p-1'}>
					<div className={'bg-primary p-1 text-white'}>
						Did you <span className={'text-gray-400'}>Log In?</span>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={'h-full w-full flex flex-col justify-start items-center'}>
						<EventInput
							label={'First Name'}
							keyname={TAG_FUNC_P_FIRST}
							register={register}
							required={true}
						/>
						<EventInput
							label={'Last Name'}
							keyname={TAG_FUNC_P_LAST}
							register={register}
							required={true}
						/>
						<EventInput
							label={'Email'}
							keyname={TAG_FUNC_P_EMAIL}
							register={register}
							required={true}
						/>
						<div className={'flex w-full flex-col my-1'}>
							<Label>Attendee</Label>
							<select
								defaultValue={TAG_FUNC_P_ATTND_DEFAULT}
								{...register(TAG_FUNC_P_ATTND)}
								className={'border-2 border-grey-500 w-1/4'}>
								{Array(TAG_FUNC_P_ATTND_MAX)
									.fill(0)
									.map((_, index) => {
										return (
											<option key={index} value={index + 1}>
												{index + 1}
											</option>
										)
									})}
							</select>
						</div>
						<Button className={'w-full'} type="submit">
							Register
						</Button>
						<div onClick={onReset} className="text-center border-b-4">
							Go Back
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default EventRSVPForm
