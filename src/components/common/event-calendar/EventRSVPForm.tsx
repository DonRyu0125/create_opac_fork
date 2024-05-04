import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import DropdownSelect from '../DropdownSelect'
import axios from 'axios'
import {
	EVENT_PATRON_ATTND,
	EVENT_PATRON_EMAIL,
	EVENT_PATRON_FIRST_NAME,
	EVENT_PATRON_ID,
	EVENT_PATRON_LAST_NAME,
} from './EventCalendar'

type Inputs = {
	[EVENT_PATRON_FIRST_NAME]: string
	[EVENT_PATRON_LAST_NAME]: string
	[EVENT_PATRON_EMAIL]: string
	[EVENT_PATRON_ATTND]: number
}

type EventInput = {
	label: string
	keyname: string
	register: Function
	required: boolean
}

type EventRSVPForm = {
	capacity: number
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

const EventRSVPForm = ({ capacity }: EventRSVPForm) => {
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

		// $.ajax({
		//   async: false,
		//   type: "POST",
		//   url: url,
		//   contentType: "text/xml",
		//   dataType: "xml",
		//   data: xmlForm,
		//   processData: false,
		//   cache: false,
		//   timeout: 300000,
		//   success: function (data, textStatus, xhr) {
		//     if (jQuery.isXMLDoc(data)) {
		//       var xml_value = getXmlFieldValue(data, "error");
		//       if (xml_value != '' && parseInt(xml_value, 10) == 0) {
		//         // alert ('Status is changed');
		//         getClientInfo(patronId)
		//         window.location.reload();
		//       }
		//     }
		//   },
		//   error: function (e) {
		//     console.error(e);
		//   }
		// });

		let url = `http://norfolk_test.minisisinc.com/x1QMIWF2EHIJK3?manipxmlrecord&database=M2L_TAG&key=${EVENT_PATRON_ID}&value=99999999&READ=N`

		var xmlForm = `<?xml version="1.0" encoding="UTF-8"?>
		<RECORD>
			<${EVENT_PATRON_FIRST_NAME} op="chg">test_first</${EVENT_PATRON_FIRST_NAME}>
			<${EVENT_PATRON_LAST_NAME} op="chg">test_last</${EVENT_PATRON_LAST_NAME}>
		</RECORD>`

		// https://rmg.minisisinc.com/scripts/mwimain.dll/282975215-1458443181L?manipxmlrecord&database=client_info_view&key=C_CLIENT_NUMBER&value=20230003&READ=N
		try {
			const response = await axios.get(
				`${BASE_URL}/scripts/mwimain.dll/144/M2L_TAG/${MONTH_REPORT}?commandsearch&exp=${FIELD} ${WILDCARD}`,
				{
					headers: {
						'Content-Type': 'text/xml',
					},
				}
			)
		} catch (error) {
			throw error
		}
	}

	const onClick = () => {
		setShowForm((prev) => !prev)
	}

	return (
		<div className={'flex justify-center w-full'}>
			{!showForm && <Button onClick={onClick}>Register ({capacity})</Button>}
			{showForm && (
				<div className={'h-full w-full p-1'}>
					<div className={'bg-primary p-1 text-white'}>
						Did you <span className={'text-gray-400'}>Log In?</span>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={'h-full w-full flex flex-col justify-start items-center'}>
						<EventInput
							label={'First Name'}
							keyname={EVENT_PATRON_FIRST_NAME}
							register={register}
							required={true}
						/>
						<EventInput
							label={'Last Name'}
							keyname={EVENT_PATRON_LAST_NAME}
							register={register}
							required={true}
						/>
						<EventInput
							label={'Email'}
							keyname={EVENT_PATRON_EMAIL}
							register={register}
							required={true}
						/>
						<div className={'flex w-full flex-col my-1'}>
							<Label>Attendee</Label>
							<Input
								type="number"
								step="1"
								className={'border-2 border-grey-500 w-[30%]'}
								{...register(EVENT_PATRON_ATTND)}
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
