import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import X2JS from 'x2js'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import {
	BD_ADDRESS,
	CURATORS_CODE,
	BD_CITY,
	VERIFICATION_EMAIL_T,
	Cal_event,
	ContactInfo,
	MAIN_MWI_APPLICATION,
	MWI_RESFUL_RES,
	MWI_XML_DATA_INDEX,
	SISN,
	TAG_FUNC_DATE,
	TAG_FUNC_END_T,
	TAG_FUNC_LOC,
	TAG_FUNC_P_ATTND,
	TAG_FUNC_P_ATTND_DEFAULT,
	TAG_FUNC_P_ATTND_MAX,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_FIRST,
	TAG_FUNC_P_LAST,
	TAG_FUNC_LOC_ROO,
	TAG_FUNC_START_T,
	TAG_NAME,
	patron,
	RSVP_CONFIRM_LANDING_PAGE_URL,
	TAG_FUNC_P_T,
	TAG_DB,
	TAG_FUNC_LOC_ID,
	BD_POSTAL_CODE,
	BD_BUILDING_NAME,
	TAG_FUNC_LOC_CT,
	TAG_FUNC_LOC_EM,
} from './Constants'
import { BadgeCheck, Mail, Phone, SquareUserRound } from 'lucide-react'
import {
	convertLowerTrim,
	convertToArr,
	convertXMLToJson,
	encodeObj,
	getCurrentDate,
	getSessionID,
} from '@/lib/utils'
import Spinner from './Spinner'
import { calNumOfPatron } from './EC-Util'
import useConstants from '@/hooks/useConstants'
import { useAtom } from 'jotai'
import { calendarCurrDate, calendarEvents, calendarWeekType } from '@/store'
import { fetch_get } from './Service'

type Inputs = {
	[TAG_FUNC_P_FIRST]: string
	[TAG_FUNC_P_LAST]: string
	[TAG_FUNC_P_EMAIL]: string
	[TAG_FUNC_P_ATTND]: number
}

const STATUS_TYPE = {
	SHOW_FORM: 'SHOW_FORM',
	SHOW_BTN: 'SHOW_BTN',
	SHOW_SUCCESS: 'SHOW_SUCCESS',
}

type EventInput = {
	label: string
	keyname: string
	register: Function
	required: boolean
	errors?: any
}

type EventRSVPForm = {
	capacity: number
	patrons: patron[]
	sisnNumber: number
	event: Cal_event
	contactInfo: ContactInfo[]
}

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

const EventEmailInput = ({ label, keyname, register, required, errors }: EventInput) => {
	return (
		<div className={'flex w-full flex-col my-1'}>
			<Label>{label}</Label>
			<Input
				className={'border-2 border-grey-500'}
				{...register(keyname, {
					required: required,
					pattern: {
						value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						message: 'Invalid email address',
					},
				})}
			/>
			{errors[TAG_FUNC_P_EMAIL]?.message}
		</div>
	)
}

const ShowForm = ({
	loading,
	handleSubmit,
	register,
	onSubmit,
	errors,
	onReset,
}: {
	loading: boolean
	handleSubmit: Function
	register: Function
	onSubmit: Function
	errors: any
	onReset: any
}) => {
	const message = useConstants().message
	return (
		<div className={'h-full w-full p-1 border-2 rounded'}>
			{loading && <Spinner height={'h-full'} spinHeight={'h-10'} spinWidth={'w-10'} />}
			<div className={'bg-primary p-1 text-white'}>
				<span className={'text-gray-400'}>{message.logIn}?</span>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={'h-full w-full flex flex-col justify-start items-center'}>
				<EventInput
					label={message.firstName}
					keyname={TAG_FUNC_P_FIRST}
					register={register}
					required={true}
				/>
				<EventInput
					label={message.lastName}
					keyname={TAG_FUNC_P_LAST}
					register={register}
					required={true}
				/>
				<EventEmailInput
					label={message.email}
					keyname={TAG_FUNC_P_EMAIL}
					register={register}
					required={true}
					errors={errors}
				/>
				<div className={'flex w-full flex-col my-1'}>
					<Label>{message.attendee}</Label>
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
					{message.register}
				</Button>
				<div onClick={onReset} className="text-center border-b-4">
					{message.goBack}
				</div>
			</form>
		</div>
	)
}

const ShowButton = ({
	capacity,
	patrons,
	getContactInfo,
	setStatus,
	event,
}: {
	capacity: number
	patrons: patron[]
	getContactInfo: Function
	setStatus: React.Dispatch<React.SetStateAction<string>>
	event: Cal_event
}) => {
	const message = useConstants().message

	return (
		<div className={'min-h-[388px] w-full p-2 border-2 h-full rounded '}>
			<div
				className={
					'min-h-[194px] h-1/2 w-full flex flex-col items-center justify-evenly  border-b-4'
				}>
				<div className={'flex justify-center items-center'}>
					<SquareUserRound /> {message.registrationRequired}
				</div>
				<Button
					disabled={capacity - calNumOfPatron(patrons) <= 0 ? true : false}
					className={'w-full '}
					onClick={() => setStatus(STATUS_TYPE.SHOW_FORM)}>
					{message.register}
				</Button>
				<div className={'flex justify-center items-center'}>
					{capacity - calNumOfPatron(patrons) <= 0 ? (
						<div className={'flex text-red-600 justify-center items-center'}>
							{message.noSeatsRemaining}
						</div>
					) : (
						<div className={'flex text-lime-800 justify-center items-center'}>
							<BadgeCheck />{' '}
							{`${capacity - calNumOfPatron(patrons)} ${message.seatsRemaining}`}
						</div>
					)}
				</div>
			</div>
			{getContactInfo(BD_ADDRESS) ? (
				<div className={'min-h-[194px] h-1/2 w-full flex flex-col items-start justify-evenly  text-sm'}>
					<div className={'w-full  '}>
						{message.contactInfo}
						<div className={'flex font-normal'}>
							<Phone className={'h-[18px]'} />
							{event[TAG_FUNC_LOC_CT]}
						</div>
						<div className={'flex font-normal'}>
							<Mail className={'h-[18px]'} />
							{event[TAG_FUNC_LOC_EM]}
						</div>
					</div>
					<div className={'w-full '}>
						{message.address}
						<div className={'font-normal'}>{getContactInfo(BD_BUILDING_NAME)}</div>
						<div className={'font-normal'}>
							{getContactInfo(BD_ADDRESS)} {getContactInfo(BD_CITY)},{' '}
							{getContactInfo(BD_POSTAL_CODE)}
						</div>
					</div>
				</div>
			) : (
				<div className={'h-1/2 w-full flex flex-col items-center justify-center '}>
					<div>{message.privateProperty}</div>
					<div className={'text-center'}>{message.contactInfoNotProvided}</div>
				</div>
			)}
		</div>
	)
}

const ShowRSVPSuccess = ({
	onReset,
	getContactInfo,
	event
}: {
	onReset: any
	getContactInfo: Function
	event: Cal_event
}) => {
	const message = useConstants().message
	return (
		<div className={'min-h-[388px] h-full w-full p-2 border-2 rounded'}>
			<div className={'min-h-[194px] text-center w-full h-3/6 flex flex-col items-center justify-evenly'}>
				<SquareUserRound />
				<div>{message.checkEmail}</div>
				<div>{message.registrationIncomplete}</div>
			</div>
			<div
				onClick={onReset}
				className="text-center bg-primary text-primary-foreground rounded">
				{message.goBack}
			</div>
			{getContactInfo(BD_ADDRESS) ? (
				<div className={'min-h-[194px] h-1/2 w-full flex flex-col items-start justify-evenly  text-sm'}>
					<div className={'w-full  '}>
						{message.contactInfo}
						<div className={'flex font-normal'}>
							<Phone className={'h-[18px]'} />
							{event[TAG_FUNC_LOC_CT]}
						</div>
						<div className={'flex font-normal'}>
							<Mail className={'h-[18px]'} />
							{event[TAG_FUNC_LOC_EM]}
						</div>
					</div>
					<div className={'w-full '}>
						{message.address}
						<div className={'font-normal'}>{getContactInfo(BD_BUILDING_NAME)}</div>
						<div className={'font-normal'}>
							{getContactInfo(BD_ADDRESS)} {getContactInfo(BD_CITY)},{' '}
							{getContactInfo(BD_POSTAL_CODE)}
						</div>
					</div>
				</div>
			) : (
				<div className={'h-1/2 w-full flex flex-col items-center justify-center '}>
					<div>{message.privateProperty}</div>
					<div className={'text-center'}>{message.contactInfoNotProvided}</div>
				</div>
			)}
		</div>
	)
}

const EventRSVPForm = ({ capacity, patrons, sisnNumber, event, contactInfo }: EventRSVPForm) => {
	const [status, setStatus] = useState(STATUS_TYPE.SHOW_BTN)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Inputs>()
	const [loading, setLoading] = useState(false)
	const [currentDate, _] = useAtom(calendarCurrDate)
	const [weekType, __] = useAtom(calendarWeekType)
	const [___, setCurrentEvent] = useAtom(calendarEvents)

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setLoading(true)
		return getOCCNumber()
			.then((res) => {
				sendEmail(res, data, event)
			})
			.catch((error) => {
				console.error('Error fetching session ID:', error)
				setLoading(false)
				onReset()
			})
	}

	const getOCCNumber = async () => {
		let HOME_SESSID = getSessionID()

		return await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=${TAG_DB}&READ=Y&KEY=${SISN}&VALUE=${sisnNumber}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((res) => {
				const conToJson: any = convertXMLToJson(res.data)
				const jsonObj = conToJson[MWI_RESFUL_RES].record
				const loc_group = convertToArr(jsonObj.TAG_FUNC_LOC_GRP)
				const dte_group = convertToArr(loc_group[MWI_XML_DATA_INDEX].TAG_FUNC_DTE_GRP)
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

				return { occ1: TAG_FUNC_LOC_OCC, occ2: TAG_FUNC_DTE_OCC }
			})
			.catch((error) => {
				console.error('Getting record error', error)
				return { occ1: 0, occ2: 0 }
			})
	}

	const getContactInfo = (type: string) => {
		let info: any = contactInfo?.filter((item) => {
			return (
				convertLowerTrim(item[CURATORS_CODE]) === convertLowerTrim(event[TAG_FUNC_LOC_ID])
			)
		})
		if (info.length > 0) {
			let contact = info[0]
			return contact[type]
		}

		return ''
	}

	const sendEmail = async (patron: any, patronInfo: Inputs, event: Cal_event) => {
		let HOME_SESSID = getSessionID()
		const encoded = encodeObj(
			JSON.stringify({
				...patronInfo,
				[TAG_NAME]: event[TAG_NAME],
				[TAG_FUNC_START_T]: event[TAG_FUNC_START_T],
				[TAG_FUNC_END_T]: event[TAG_FUNC_END_T],
				[TAG_FUNC_LOC_ROO]: event[TAG_FUNC_LOC_ROO],
				[TAG_FUNC_DATE]: event[TAG_FUNC_DATE],
				[TAG_FUNC_LOC]: event[TAG_FUNC_LOC],
				[SISN]: event[SISN],
				[TAG_FUNC_P_T]: getCurrentDate(),
				BD_ADDRESS: getContactInfo(BD_ADDRESS),
				occ1: patron.occ1,
				occ2: patron.occ2,
			})
		)

		return await axios
			.post(
				`${HOME_SESSID}?SAVE_MAIL_FORM&TEMPLATE=[CALENDAR]RSVPVerificationConfirmTmp.txt&FROM_DEFAULT=noreply@minisisinc.com&TO_DEFAULT=${patronInfo[TAG_FUNC_P_EMAIL]}&SUBJECT_DEFAULT=${VERIFICATION_EMAIL_T} ${event[TAG_NAME]}`,
				{
					...patronInfo,
					[TAG_NAME]: event[TAG_NAME],
					[TAG_FUNC_DATE]: event[TAG_FUNC_DATE],
					[TAG_FUNC_P_T]: getCurrentDate(),
					[BD_ADDRESS]: getContactInfo(BD_ADDRESS),
					RSVP_CONFIRM_LANDING_PAGE_URL: RSVP_CONFIRM_LANDING_PAGE_URL,
					encoded,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then(async () => {
				setStatus(STATUS_TYPE.SHOW_SUCCESS)
				setLoading(false)
				const currE = await fetch_get(currentDate, weekType)
				setCurrentEvent(currE)
			})
	}

	const onReset = () => {
		setLoading(false)
		setStatus(STATUS_TYPE.SHOW_BTN)
		reset()
	}

	const showRSVPStatus = () => {
		switch (status) {
			case STATUS_TYPE.SHOW_BTN:
				return (
					// <ShowButton
					// 	event={event}
					// 	capacity={capacity}
					// 	patrons={patrons}
					// 	getContactInfo={getContactInfo}
					// 	setStatus={setStatus}
					// />
					<ShowRSVPSuccess onReset={onReset} getContactInfo={getContactInfo} event={event} />
				)
			case STATUS_TYPE.SHOW_FORM:
				return (
					<ShowForm
						loading={loading}
						handleSubmit={handleSubmit}
						register={register}
						onSubmit={onSubmit}
						errors={errors}
						onReset={onReset}
					/>
				)
			case STATUS_TYPE.SHOW_SUCCESS:
				return <ShowRSVPSuccess onReset={onReset} getContactInfo={getContactInfo} event={event} />
			default:
				return (
					<ShowButton
						event={event}
						capacity={capacity}
						patrons={patrons}
						getContactInfo={getContactInfo}
						setStatus={setStatus}
					/>
				)
		}
	}

	return <>{showRSVPStatus()}</>
}

export default EventRSVPForm
