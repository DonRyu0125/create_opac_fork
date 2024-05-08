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
	TAG_FUNC_DTE_GRP,
	TAG_FUNC_LOC_GRP,
	TAG_FUNC_P_ATTND,
	TAG_FUNC_P_EMAIL,
	TAG_FUNC_P_FIRST,
	TAG_FUNC_P_ID,
	TAG_FUNC_P_LAST,
	TAG_FUNC_P_PAID,
	TAG_NAME,
	patron,
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
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		let urlForSessionID = '/scripts/mwimain.dll?logon&application=M2L_TAG_TO_BIBLIO'

		//TAG_NAME

		let test = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_NAME} op="chg">
				99999999999999999
			</${TAG_NAME}>
		</RECORD>`

		let xmlFormAdd = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${TAG_FUNC_LOC_GRP} op="chg">
				<${TAG_FUNC_DTE_GRP} op="chg">
					<${FUNC_LOC_P_GRP} op="chg">
						<${TAG_FUNC_P_ID}>11</${TAG_FUNC_P_ID}>
						<${TAG_FUNC_P_FIRST}>${data[TAG_FUNC_P_FIRST]}</${TAG_FUNC_P_FIRST}>
						<${TAG_FUNC_P_LAST}>${data[TAG_FUNC_P_LAST]}</${TAG_FUNC_P_LAST}>
						<${TAG_FUNC_P_EMAIL}>${data[TAG_FUNC_P_EMAIL]}</${TAG_FUNC_P_EMAIL}>
						<${TAG_FUNC_P_PAID}>X</${TAG_FUNC_P_PAID}>
						<${TAG_FUNC_P_ATTND}>${data[TAG_FUNC_P_ATTND]}</${TAG_FUNC_P_ATTND}>
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


		if (!document.cookie) {
			console.log('asd')
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
				.then((res) => {
					storePatron(xmlFormAdd)
				})
				.catch((error) => {
					console.error('Error fetching session ID:', error)
				});
		}
		return storePatron(xmlFormAdd);
	}

	const storePatron = (xmlFormAdd: string) => {
		let match = document.cookie.match(/HOME_SESSID=(http:\/\/[^;]+)/) ?? ''
		let session_id = match[1]?.split('/')[5]

		axios
			.post(`/${session_id}?manipxmlrecord&database=M2L_TAG&CREATE=Y`, xmlFormAdd, {
				headers: {
					'Content-Type': 'text/xml',
				},
				timeout: 5000,
			})
			.then((response) => {})
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
