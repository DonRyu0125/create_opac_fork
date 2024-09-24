import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { saveAs } from 'file-saver'
import ReCAPTCHA from 'react-google-recaptcha'
import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import {
	BD_ADDRESS,
	CURATORS_CODE,
	BD_CITY,
	VERIFICATION_EMAIL_T,
	Cal_event,
	ContactInfoRSVP,
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
	TAG_FUNC_RSVP,
	FLOC_TX_ACCESS,
	TAG_FUNC_O,
	TAG_FUNC_O_PATH,
	TAG_FUNC_O_ID,
	TAG_FUNC_O_CODE,
} from './Constants'
import { BadgeCheck, FileDown, Mail, MonitorPlay, Phone, SquareUserRound } from 'lucide-react'
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
import { fetch_get, getContactInfo } from './Service'
import ButtonTooltip from './ButtonTooltip'

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
	contactInfo: ContactInfoRSVP[]
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
	const [captchaValue, setCaptchaValue] = useState<string | null>(null)

	const handleCaptchaChange = (value: string | null) => {
		setCaptchaValue(value)
	}

	//captchaValues
	const handleFormSubmit = (data: any) => {
		onSubmit({ ...data, captcha: captchaValue })
		//   if (captchaValue) {
		// 	onSubmit({ ...data, captcha: captchaValue });
		//   } else {
		// 	// Handle case where CAPTCHA is not filled out
		// 	console.error('CAPTCHA verification failed');
		//   }
	}

	return (
		<div className={'h-full w-full p-1 border-2 rounded text-lg'}>
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
							?.map((_, index) => (
								<option key={index} value={index + 1}>
									{index + 1}
								</option>
							))}
					</select>
				</div>
				{/* <div className={'my-2'}>
					<ReCAPTCHA
						sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your reCAPTCHA site key
						onChange={handleCaptchaChange}
					/>
				</div> */}
				<Button className={'w-full font-bold'} type="submit">
					{message.register}
				</Button>
				<div onClick={onReset} className="text-center border-b-4 font-bold">
					{message.goBack}
				</div>
			</form>
		</div>
	)
}

const ShowButton = ({
	capacity,
	patrons,
	setStatus,
	event,
	contactInfo,
}: {
	capacity: number
	patrons: patron[]
	setStatus: React.Dispatch<React.SetStateAction<string>>
	event: Cal_event
	contactInfo: ContactInfoRSVP[]
}) => {
	const message = useConstants().message

	const handleDownload = async () => {
		const fileUrl = event[FLOC_TX_ACCESS]
		if (fileUrl) {
			try {
				const response = await fetch(fileUrl)
				if (!response.ok) throw new Error('Network response was not ok')
				const blob = await response.blob()
				saveAs(blob, fileUrl.split('/').pop() || 'downloaded-file')
			} catch (error) {
				console.error('Error downloading file:', error)
			}
		}
	}
	return (
		<div className={'h-full w-full h-full text-lg'}>
			{event[TAG_FUNC_RSVP] && (
				<div
					className={
						'h-1/2 w-full flex flex-col items-center justify-evenly p-1 border-2 rounded'
					}>
					<div className={'flex justify-center items-center'}>
						<SquareUserRound className={'h-[30px]'} /> {message.registrationRequired}
					</div>
					<Button
						disabled={capacity - calNumOfPatron(patrons) <= 0 ? true : false}
						className={'w-full font-bold'}
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
			)}
			{getContactInfo(BD_ADDRESS, contactInfo, event) ? (
				<div
					className={`${event[TAG_FUNC_RSVP] ? 'h-1/2' : 'h-[58%]'} w-full flex flex-col items-start justify-evenly text-lg p-1 border-2 rounded`}>
					<div className={'w-full text-center'}>
						{message.contactInfo}
						<div className={'flex font-normal items-center text-base'}>
							<Phone size={25} />
							{event[TAG_FUNC_LOC_CT]}
						</div>
						<div className={'flex font-normal items-center text-base'}>
							<Mail size={25} />
							{event[TAG_FUNC_LOC_EM]}
						</div>
					</div>
					<div className={'w-full'}>
						{/*@ts-ignore there is variable called TAG_FUNC_O*/}
						{event[TAG_FUNC_O] ? (
							<>
								<div className={'flex font-normal items-center'}>
									<MonitorPlay size={25} />
									<div>{message.online}</div>
								</div>
								<div className={'text-sm my-2 text-center'}>
									"Use the meeting link to access the session!"
								</div>
							</>
						) : (
							<>
								<div className={'font-normal text-base'}>
									{getContactInfo(BD_BUILDING_NAME, contactInfo, event)}
								</div>
								<div className={'font-normal text-base'}>
									<div>{getContactInfo(BD_ADDRESS, contactInfo, event)}</div>
									<div>
										<span className={'mr-1'}>
											{getContactInfo(BD_CITY, contactInfo, event)}
										</span>
										<span>
											{getContactInfo(BD_POSTAL_CODE, contactInfo, event)}
										</span>
									</div>
								</div>
								<div className={'text-sm my-2 text-center'}>
									"Please be in the room before meeting time"
								</div>
							</>
						)}
					</div>
					{event[FLOC_TX_ACCESS] && (
						<ButtonTooltip item={[{ TAG_NAME: `Download material` }]}>
							<Button onClick={handleDownload}>
								<FileDown />
							</Button>
						</ButtonTooltip>
					)}
				</div>
			) : (
				// If there are no building info, this is private place
				<div className={'h-1/2 w-full flex flex-col items-center justify-center'}>
					<div>{message.privateProperty}</div>
					<div className={'text-center'}>{message.contactInfoNotProvided}</div>
					{event[FLOC_TX_ACCESS] && (
						<Button onClick={handleDownload}>
							<FileDown />
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

const ShowRSVPSuccess = ({
	onReset,
	event,
	contactInfo,
}: {
	onReset: any
	event: Cal_event
	contactInfo: ContactInfoRSVP[]
}) => {
	const message = useConstants().message
	return (
		<div className={'min-h-[388px] h-full w-full p-2 border-2 rounded flex flex-col justify-evenly'}>
			<div>
				<div
					className={
						'min-h-[194px] text-center w-full h-3/6 flex flex-col items-center justify-evenly'
					}>
					<SquareUserRound className="w-12 h-12" />
					<div className={'text-xl'}>{message.checkEmail}</div>
					<div className={'text-xl'}>{message.registrationIncomplete}</div>
				</div>
				<div
					onClick={onReset}
					className="font-bold h-[40px] flex items-center justify-center text-center bg-primary text-primary-foreground rounded">
					{message.goBack}
				</div>
			</div>
			<div>
				{event[TAG_FUNC_O] ? (
					<>
						<div className={'flex font-normal items-center'}>
							<MonitorPlay size={25} />
							<div>{message.online}</div>
						</div>
						<div className={'text-sm my-2 text-center'}>
							"Use the meeting link to access the session!"
						</div>
					</>
				) : (
					<>
						<div className={'font-normal text-base'}>
							{getContactInfo(BD_BUILDING_NAME, contactInfo, event)}
						</div>
						<div className={'font-normal text-base'}>
							<div>{getContactInfo(BD_ADDRESS, contactInfo, event)}</div>
							<div>
								<span className={'mr-1'}>
									{getContactInfo(BD_CITY, contactInfo, event)}
								</span>
								<span>{getContactInfo(BD_POSTAL_CODE, contactInfo, event)}</span>
							</div>
							<div>
								{message.room}:{event[TAG_FUNC_LOC_ROO]}
							</div>
						</div>
						<div className={'text-sm my-2 text-center'}>
							"Please be in the room before meeting time"
						</div>
					</>
				)}
			</div>
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
				BD_ADDRESS: getContactInfo(BD_ADDRESS, contactInfo, event),
				occ1: patron.occ1,
				occ2: patron.occ2,
				[TAG_FUNC_O]: event[TAG_FUNC_O],
				[TAG_FUNC_O_PATH]: event[TAG_FUNC_O_PATH],
				[TAG_FUNC_O_ID]: event[TAG_FUNC_O_ID],
				[TAG_FUNC_O_CODE]: event[TAG_FUNC_O_CODE],
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
					[BD_ADDRESS]: getContactInfo(BD_ADDRESS, contactInfo, event),
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
					<ShowButton
						event={event}
						capacity={capacity}
						patrons={patrons}
						setStatus={setStatus}
						contactInfo={contactInfo}
					/>
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
				return <ShowRSVPSuccess onReset={onReset} event={event} contactInfo={contactInfo} />
			default:
				return (
					<ShowButton
						event={event}
						capacity={capacity}
						patrons={patrons}
						setStatus={setStatus}
						contactInfo={contactInfo}
					/>
				)
		}
	}

	return <>{showRSVPStatus()}</>
}

export default EventRSVPForm
