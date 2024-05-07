import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import DropdownSelect from '../DropdownSelect'
import axios from 'axios'
import {
	Cal_event,
	FUNC_LOC_P_GRP,
	PATRON,
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_ATTND,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_FIRST,
	TAG_FUNC_P_ID,
	TAG_FUNC_P_LAST,
	TAG_FUNC_P_PAID,
} from './EventCalendar'
import { BadgeCheck, SquareUserRound } from 'lucide-react'

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
}

type patron = {
	[PATRON]: string
	[TAG_FUNC_P_ID]: string
	[TAG_FUNC_P_FIRST]: string
	[TAG_FUNC_P_LAST]: string
	[TAG_FUNC_P_EMAIL]: string
	[TAG_FUNC_P_PAID]: string
	[TAG_FUNC_P_ATTND]: string
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

const EventRSVPForm = ({ capacity, patrons }: EventRSVPForm) => {
	const [showForm, setShowForm] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const BASE_URL = 'http://norfolk_test.minisisinc.com'
		const MONTH_REPORT = 'MONTHLY_CALENDAR_NEW_T4'
		const FIELD = 'TAG_FUNC_DATE'
		const WILDCARD = ''

		// http request ?logon command
		// check if HOME_SESSID exist in cookie
		// create const variable for SESSID
		// optional: check if sessid exist. if exist, apply to url variable
		// Q
		// Is it possible to store to triple nested group field?

		let url = `http://norfolk_test.minisisinc.com/x1QMIWF2EHIJK3?manipxmlrecord&database=M2L_TAG`
		let xmlFormAdd = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_FUNC_LOC_GRP} op="chg">
				<${TAG_FUNC_DTE_GRP} op="chg">
					<${FUNC_LOC_P_GRP} op="chg">
						<${TAG_FUNC_P_ID}></${TAG_FUNC_P_ID}>
						<${TAG_FUNC_P_FIRST}></${TAG_FUNC_P_FIRST}>
						<${TAG_FUNC_P_LAST}></${TAG_FUNC_P_LAST}>
						<${TAG_FUNC_P_EMAIL}></${TAG_FUNC_P_EMAIL}>
						<${TAG_FUNC_P_PAID}></${TAG_FUNC_P_PAID}>
						<${TAG_FUNC_P_ATTND}></${TAG_FUNC_P_ATTND}>
					</${TAG_FUNC_LOC_GRP}>
				</${TAG_FUNC_DTE_GRP}>
			</${FUNC_LOC_P_GRP}>
		</RECORD>`

		let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_FUNC_LOC_GRP} op="chg">
				<${TAG_FUNC_DTE_GRP} op="chg">
					<${FUNC_LOC_P_GRP} op="delete">

					</${TAG_FUNC_LOC_GRP}>
				</${TAG_FUNC_DTE_GRP}>
			</${FUNC_LOC_P_GRP}>
		</RECORD>`

		// https://rmg.minisisinc.com/scripts/mwimain.dll/282975215-1458443181L
		//?manipxmlrecord&database=client_info_view&key=C_CLIENT_NUMBER&value=20230003&READ=N
		
		axios
			.post(url, xmlFormAdd, {
				headers: {
					'Content-Type': 'text/xml',
				},
				timeout: 300000,
			})
			.then((response) => {
			
			})
	}

	const onClick = () => {
		setShowForm((prev) => !prev)
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
					<div className={'h-3/6 flex flex-col items-center justify-center border-b-4 '}>
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
							<Input
								defaultValue={1}
								type="number"
								step="1"
								className={'border-2 border-grey-500 w-[30%]'}
								{...register(TAG_FUNC_P_ATTND)}
							/>
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
