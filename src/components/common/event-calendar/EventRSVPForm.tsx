import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
	first_name: string
	last_name: string
	email: string
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
				<div className={'h-full w-full'}>
					<div className={'bg-primary p-1 text-white'}>
						Did you <span className={'text-gray-400'}>Log In?</span>
					</div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={'h-full w-full flex flex-col justify-evenly items-center'}>
						<div className={'flex w-full flex-col my-1'}>
							<Label>First Name</Label>
							<input
								className={'border-2 border-grey-500'}
								{...register('first_name', { required: true })}
							/>
						</div>
						<div className={'flex w-full flex-col my-1'}>
							<Label>Last Name</Label>
							<input
								className={'border-2 border-grey-500'}
								{...register('last_name', { required: true })}
							/>
						</div>
						<div className={'flex w-full flex-col my-1'}>
							<Label>Email</Label>
							<input
								className={'border-2 border-grey-500'}
								{...register('email', { required: true })}
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
