import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import DropdownSelect from '../DropdownSelect'

type Inputs = {
	first_name: string
	last_name: string
	email: string
	attendee: number
}

type EventInput = {
	label: string
	keyname: string
	register: Function
	required: boolean
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

const EventRSVPForm = () => {
	const [showForm, setShowForm] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

	const onClick = () => {
		setShowForm((prev) => !prev)
	}

	return (
		<div className={'flex justify-center w-full'}>
			{!showForm && <Button onClick={onClick}>Register</Button>}
			{showForm && (
				<div className={'h-full w-full p-2'}>
					<div className={'bg-primary p-1 text-white'}>
						Did you <span className={'text-gray-400'}>Log In?</span>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={'h-full w-full flex flex-col justify-evenly items-center'}>
						<EventInput
							label={'First Name'}
							keyname={'first_name'}
							register={register}
							required={true}
						/>
						<EventInput
							label={'Last Name'}
							keyname={'last_name'}
							register={register}
							required={true}
						/>
						<EventInput
							label={'Email'}
							keyname={'email'}
							register={register}
							required={true}
						/>
						<div className={'flex w-full flex-col my-1'}>
							<Label>Attendee</Label>
							<select
								{...register('attendee')}
								className={
									'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
								}>
								<option value={'asd'}>asd</option>
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
