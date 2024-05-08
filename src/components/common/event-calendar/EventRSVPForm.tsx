import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import {
	Cal_event,
	FUNC_LOC_P_GRP,
	PATRON,
	SISN,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_ATTND,
	TAG_FUNC_P_ATTND_DEFAULT,
	TAG_FUNC_P_ATTND_MAX,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_FIRST,
	TAG_FUNC_P_ID,
	TAG_FUNC_P_LAST,
	TAG_FUNC_P_PAID,
	TAG_NAME,
	patron,
} from './EventCalendar'
import { BadgeCheck, SquareUserRound } from 'lucide-react'
import DropdownSelect from '../DropdownSelect'

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
	sisnNumber:number
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

const EventRSVPForm = ({ capacity, patrons, sisnNumber }: EventRSVPForm) => {
	const [showForm, setShowForm] = useState(false)
	const { register, handleSubmit, reset } = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		let urlForSessionID = '/scripts/mwimain.dll?logon&application=M2L_TAG_TO_BIBLIO'
		let test = `<?xml version="1.0" encoding="UTF-8"?><RECORD><TAG_TYPE>Calendar</TAG_TYPE><TAG_ID>898989</TAG_ID><${TAG_NAME}>99999999999999999</${TAG_NAME}><TAG_CREATOR>NORFOLK_M2L_MGR</TAG_CREATOR><TAG_CREATE_DAT>2024-05-08</TAG_CREATE_DAT><TAG_CATALOGUE>Juvenile</TAG_CATALOGUE></RECORD>`

		// TAG_ID                    :	T00002218
		// TAG_NAME                  :	korean food
		// TAG_CREATOR               :	NORFOLK_M2L_MGR

		// <TAG_TYPE>Calendar</TAG_TYPE>
		// <TAG_ID op="chg">T00002218</TAG_ID>
		// <TAG_NAME>korean food</TAG_NAME>
		// <TAG_CREATOR op="chg">NORFOLK_M2L_MGR</TAG_CREATOR>
		// <TAG_CREATE_DAT op="chg">2024-05-08</TAG_CREATE_DAT>
		// <TAG_CATALOGUE>Juvenile</TAG_CATALOGUE>



		let xmlFormAdd = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_FUNC_LOC_GRP} op="chg">
				<${TAG_FUNC_DTE_GRP} op="chg">
					<${FUNC_LOC_P_GRP} op="chg">
						<${TAG_FUNC_P_ID}>11</${TAG_FUNC_P_ID}>
						<${TAG_FUNC_P_FIRST}>${data[TAG_FUNC_P_FIRST]}</${TAG_FUNC_P_FIRST}>
						<${TAG_FUNC_P_LAST}>${data[TAG_FUNC_P_LAST]}</${TAG_FUNC_P_LAST}>
						<${TAG_FUNC_P_EMAIL}>${data[TAG_FUNC_P_EMAIL]}</${TAG_FUNC_P_EMAIL}>
						<${TAG_FUNC_P_ATTND}>${data[TAG_FUNC_P_ATTND]}</${TAG_FUNC_P_ATTND}>
					</${FUNC_LOC_P_GRP}>
				</${TAG_FUNC_DTE_GRP}>
			</${TAG_FUNC_LOC_GRP}>
		</RECORD>`

		let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_FUNC_LOC_GRP} op="chg">
				<${TAG_FUNC_DTE_GRP} op="chg">
					<${FUNC_LOC_P_GRP} op="chg" search="1">
						
					</${FUNC_LOC_P_GRP}>
				</${TAG_FUNC_DTE_GRP}>
			</${TAG_FUNC_LOC_GRP}>
		</RECORD>`

		// if (!document.cookie) {
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
			.then(async (res) => {
				await storePatron(xmlFormAdd)
			})
			.catch((error) => {
				console.error('Error fetching session ID:', error)
			})
		// }
		// return storePatron(test);
	}

	const storePatron = async (xmlFormAdd: string) => {
		let match = document.cookie.match(/HOME_SESSID=(http:\/\/[^;]+)/) ?? ''
		let HOME_SESSID = match[0]?.split('=')[1]

		await axios
			.post(
				`${HOME_SESSID}?manipxmlrecord&database=M2L_TAG&READ=N&KEY=${SISN}&VALUE=${sisnNumber}`,
				xmlFormAdd,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
					timeout: 5000,
				}
			)
			.then((response) => {})
	}

	const onClick = () => {
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
							onClick={onClick}>{`Register`}</Button>
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
						<div>Telephone:000-000-0000</div>
						<div>Email:test@gmail.com</div>
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
						<div onClick={onClick} className="text-center border-b-4">
							Go Back
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default EventRSVPForm
