import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
	example: string
	exampleRequired: string
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
		<div className={'flex flex-col '}>
			{!showForm && <Button onClick={onClick}>Register</Button>}
			{showForm && (
				<form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col items-center'}>
					<input defaultValue="test" {...register('example')} />
					<input {...register('exampleRequired', { required: true })} />
					{errors.exampleRequired && <span>This field is required</span>}
					<Button type="submit">Register</Button>
                    <div onClick={onClick}>Go Back</div>
				</form>
			)}
		</div>
	)
}

export default EventRSVPForm
