import Layout from '@/components/layouts'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PASSWORD_MIN_LENGTH } from './Register'
import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import useConstants from '@/hooks/useConstants'

type ResetFormData = {
	PATRON_PID: string
	PATRON_PID_RE: string
}

const ResetPin = () => {
	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			PATRON_PID: '',
			PATRON_PID_RE: '',
		},
	})

	const [isSubmit, setIsSubmit] = useState(false)
	const { message } = useConstants()


// 	<Web Address>
// ?RESETPASSWORD
// &application=<Reset Password Application ID>
// &language=<Language ID>]
// &file=<File Path to Web Page after Resetting Password></File>

	const onSubmit = async (data:ResetFormData) => {
		const formData = new FormData()
		formData.append('PATRON_PID', data.PATRON_PID)

		// save_n_stop_record need a return url but react doesn't need it so I add dummy &RETURN_URL=[OPAC]register-confirm.html
		// return await axios
		// .post(`${records[0].save_n_stop_record}&CLOSE=Y&RETURN_URL=[OPAC]register-confirm.html`, formData)
		// .then(() => {
		// 	setIsSaveRecordSent(true)
		// })
		// .catch((error) => {
		// 	throw error
		// })
	}

	return (
		<Layout>
			<img
				src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
				alt=""
				className="h-64 w-full object-cover"
			/>
			{isSubmit ? (
				<div className="min-h-[35vh] flex flex-col items-center justify-center p-8 text-center">
					<div className={'m-5'}>
						<CircleCheck className="w-16 h-16" />
					</div>
					<h1 className="landing-page-title">We have sent a verification EMAIL to</h1>
					<div className={'text-xl m-4'}>
						Please check the emtail for further instructions
					</div>
				</div>
			) : (
				<div className={'min-h-[460px] flex  justify-center items-center mb-4'}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="bg-gray-200 p-5 rounded-md w-5/6 flex flex-col justify-center items-center">
						<div className="landing-page-title"> {message.password}</div>
						<div className={'text-xl m-4 text-center'}>
							Enter your new password to reset password.
						</div>
						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									Password <span className="text-red-500">*</span>
								</label>
								<input
									type="password"
									{...register('PATRON_PID', {
										required: 'Password is required',
										minLength: {
											value: PASSWORD_MIN_LENGTH,
											message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
										},
									})}
									placeholder="Password"
									className="border p-2 w-full mt-1"
								/>
								{errors.PATRON_PID && (
									<p className="text-red-500">{errors.PATRON_PID.message}</p>
								)}
							</div>

							<div className="flex-1">
								<label className="font-semibold">
									{message.confirm}{message.password} <span className="text-red-500">*</span>
								</label>
								<input
									type="password"
									{...register('PATRON_PID_RE', {
										required: 'Please confirm your password',
										validate: (value) =>
											value === watch('PATRON_PID') ||
											'Passwords do not match',
									})}
									placeholder="Confirm Password"
									className="border p-2 w-full mt-1"
								/>
								{errors.PATRON_PID_RE && (
									<p className="text-red-500">{errors.PATRON_PID_RE.message}</p>
								)}
							</div>
						</div>
						<Button className={'mt-5'}>{message.submit}</Button>
					</form>
				</div>
			)}
		</Layout>
	)
}

export default ResetPin
