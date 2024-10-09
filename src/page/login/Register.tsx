import PageAction from '@/components/common/PageAction'
import Spinner from '@/components/common/event-calendar/Spinner'
import Layout from '@/components/layouts'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import useConstants from '@/hooks/useConstants'
import { Button } from '@/components/ui/button'

type FormData = {
	yourDetail: {
		email: string
		firstName: string
		lastName: string
		cardNumber?: string
		password: string
		retypePassword: string
	}
	currentAddress: {
		address1: string
		city: string
		province: string
		postalCode: string
		country: string
	}
	contacts: {
		organization: string
		workNumber: string
		phoneNumber: string
	}
	researchInterest?: string
	recaptcha: string
}

const PASSWORD_MIN_LENGTH = 1

const Register = () => {
	const [loading, setLoading] = useState(false)
	const [isSubmit, setIsSubmit] = useState(false)
	const conf = useConstants().config
	const [recaptchaToken, setRecaptchaToken] = useState<string>('')
	const { message } = useConstants()
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: {
			yourDetail: {
				email: '',
				firstName: '',
				lastName: '',
				cardNumber: '',
				password: '',
				retypePassword: '',
			},
			currentAddress: {
				address1: '',
				city: '',
				province: '',
				postalCode: '',
				country: '',
			},
			contacts: {
				organization: '',
				workNumber: '',
				phoneNumber: '',
			},
			recaptcha: '',
		},
	})
	const [currentStep, setCurrentStep] = useState(1)

	const getStepFields = (step: number) => {
		switch (step) {
			case 1:
				return [
					'yourDetail.email',
					'yourDetail.firstName',
					'yourDetail.lastName',
					'yourDetail.cardNumber',
					'yourDetail.password',
					'yourDetail.retypePassword',
				] as const
			case 2:
				return [
					'currentAddress.address1',
					'currentAddress.city',
					'currentAddress.province',
					'currentAddress.postalCode',
					'currentAddress.country',
				] as const
			case 3:
				return [
					'contacts.organization',
					'contacts.workNumber',
					'contacts.phoneNumber',
				] as const
			default:
				return []
		}
	}

	const onSubmit = (data: FormData) => {
		setIsSubmit(true)
		console.log('Final Submitted Data:', data)
	}

	const handleNextStep = async () => {
		const stepFields = getStepFields(currentStep)
		const stepValidation = await trigger(stepFields as any)

		if (stepValidation) {
			setCurrentStep((prev) => prev + 1)
		}
	}

	const handlePrevStep = () => {
		setCurrentStep((prev) => prev - 1)
	}

	const onCaptchaChange = (token: any) => {
		setRecaptchaToken(token ?? '')
	}

	const showRegStatus = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 p-5 rounded-md w-5/6">
				<Tabs value={`step${currentStep}`}>
					{/* Tabs List */}
					<TabsList className="bg-gray-400 p-5 min-h-[300px] md:min-h-[70px] flex flex-wrap justify-evenly mb-6 w-full text-white">
						{[
							{ value: 'step1', label: 'Step 1: Your Detail' },
							{ value: 'step2', label: 'Step 2: Current Address' },
							{ value: 'step3', label: 'Step 3: Contacts' },
							{ value: 'step4', label: 'Step 4: Confirmation' },
						].map((tab, idx) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className={`md:w-[190px] px-4 py-2 rounded-md w-full md:w-auto ${
									currentStep > idx + 1 ? 'bg-primary' : 'bg-gray-700'
								}`}
								onClick={() => currentStep >= idx + 1 && setCurrentStep(idx + 1)}>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>

					{/* Step 1: Your Detail */}
					<TabsContent value="step1" className="p-6 bg-white shadow-md rounded-md">
						<label className="font-semibold">
							Email<span className="text-red-500">* </span>
						</label>
						<input
							{...register('yourDetail.email', {
								required: 'Email is required',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: 'Please enter a valid email address',
								},
							})}
							placeholder="Email"
							className="border p-2 w-full mt-1"
						/>
						{errors.yourDetail?.email && (
							<p className="text-red-500">{errors.yourDetail.email.message}</p>
						)}

						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									Password <span className="text-red-500">*</span>
								</label>
								<input
									type="password"
									{...register('yourDetail.password', {
										required: 'Password is required',
										minLength: {
											value: PASSWORD_MIN_LENGTH,
											message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
										},
									})}
									placeholder="Password"
									className="border p-2 w-full mt-1"
								/>
								{errors.yourDetail?.password && (
									<p className="text-red-500">
										{errors.yourDetail.password.message}
									</p>
								)}
							</div>

							<div className="flex-1">
								<label className="font-semibold">
									Retype Password <span className="text-red-500">*</span>
								</label>
								<input
									type="password"
									{...register('yourDetail.retypePassword', {
										required: 'Please confirm your password',
										validate: (value) =>
											value === watch('yourDetail.password') ||
											'Passwords do not match',
									})}
									placeholder="Retype Password"
									className="border p-2 w-full mt-1"
								/>
								{errors.yourDetail?.retypePassword && (
									<p className="text-red-500">
										{errors.yourDetail.retypePassword.message}
									</p>
								)}
							</div>
						</div>
						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									First Name <span className="text-red-500">*</span>
								</label>
								<input
									{...register('yourDetail.firstName', {
										required: 'First Name is required',
									})}
									placeholder="First Name"
									className="border p-2 w-full mt-1"
								/>
								{errors.yourDetail?.firstName && (
									<p className="text-red-500">
										{errors.yourDetail.firstName.message}
									</p>
								)}
							</div>

							<div className="flex-1">
								<label className="font-semibold">
									Last Name <span className="text-red-500">*</span>
								</label>
								<input
									{...register('yourDetail.lastName', {
										required: 'Last Name is required',
									})}
									placeholder="Last Name"
									className="border p-2 w-full mt-1"
								/>
								{errors.yourDetail?.lastName && (
									<p className="text-red-500">
										{errors.yourDetail.lastName.message}
									</p>
								)}
							</div>
						</div>

						<label className="font-semibold">Card #</label>
						<input
							{...register('yourDetail.cardNumber')}
							placeholder="Card #"
							className="border p-2 w-full mt-1"
						/>
					</TabsContent>

					{/* Step 2: Current Address */}
					<TabsContent value="step2" className="p-6 bg-white shadow-md rounded-md">
						<label className="font-semibold">
							Address 1 <span className="text-red-500">*</span>
						</label>
						<input
							{...register('currentAddress.address1', {
								required: 'Current address is required',
							})}
							placeholder="Current Address"
							className="border p-2 w-full mt-1"
						/>
						{errors.currentAddress?.address1 && (
							<p className="text-red-500">{errors.currentAddress.address1.message}</p>
						)}
						<div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mt-4">
							<div className="sm:col-span-1">
								<label className="font-semibold">
									City <span className="text-red-500">*</span>
								</label>
								<input
									{...register('currentAddress.city', {
										required: 'City is required',
									})}
									placeholder="City"
									className="border p-2 w-full mt-1"
								/>
								{errors.currentAddress?.city && (
									<p className="text-red-500">
										{errors.currentAddress.city.message}
									</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Province / State <span className="text-red-500">*</span>
								</label>
								<input
									{...register('currentAddress.province', {
										required: 'Province is required',
									})}
									placeholder="Province"
									className="border p-2 w-full mt-1"
								/>
								{errors.currentAddress?.province && (
									<p className="text-red-500">
										{errors.currentAddress.province.message}
									</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Postal Code / Zip Code <span className="text-red-500">*</span>
								</label>
								<input
									{...register('currentAddress.postalCode', {
										required: 'Postal Code is required',
									})}
									placeholder="Postal Code"
									className="border p-2 w-full mt-1"
								/>
								{errors.currentAddress?.postalCode && (
									<p className="text-red-500">
										{errors.currentAddress.postalCode.message}
									</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Country <span className="text-red-500">*</span>
								</label>
								<input
									{...register('currentAddress.country', {
										required: 'Country is required',
									})}
									placeholder="Country"
									className="border p-2 w-full mt-1"
								/>
								{errors.currentAddress?.country && (
									<p className="text-red-500">
										{errors.currentAddress.country.message}
									</p>
								)}
							</div>
						</div>
					</TabsContent>

					{/* Step 3: Contacts */}
					<TabsContent value="step3" className="p-6 bg-white shadow-md rounded-md">
						<label className="font-semibold">
							Organization <span className="text-red-500"></span>
						</label>
						<input
							{...register('contacts.organization')}
							placeholder="Organization"
							className="border p-2 w-full mt-1"
						/>
						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									Work Number <span className="text-red-500">*</span>
								</label>
								<input
									{...register('contacts.workNumber', {
										required: 'Work Number is required',
									})}
									placeholder="Work Number"
									className="border p-2 w-full mt-1"
								/>
								{errors.contacts?.workNumber && (
									<p className="text-red-500">
										{errors.contacts.workNumber.message}
									</p>
								)}
							</div>
							<div className="flex-1">
								<label className="font-semibold">
									Phone Number <span className="text-red-500">*</span>
								</label>
								<input
									{...register('contacts.phoneNumber', {
										required: 'Phone Number is required',
									})}
									placeholder="Phone Number"
									className="border p-2 w-full mt-1"
								/>
								{errors.contacts?.phoneNumber && (
									<p className="text-red-500">
										{errors.contacts.phoneNumber.message}
									</p>
								)}
							</div>
						</div>
					</TabsContent>

					{/* Step 4: Confirmation */}
					<TabsContent
						value="step4"
						className="p-6 bg-white shadow-md rounded-md w-full mx-auto">
						<div className={'flex justify-center'}>
							<div>
								<h2 className="text-lg font-semibold text-center mb-4">
									Confirmation
								</h2>
								<p className="text-center mb-6">
									Review your details and complete the registration
								</p>
								<ul className="list-disc pl-5 space-y-2">
									<li>
										<strong>Email:</strong> {watch('yourDetail.email')}
									</li>
									<li>
										<strong>Full Name:</strong>{' '}
										{`${watch('yourDetail.firstName')} ${watch('yourDetail.lastName')}`}
									</li>
									<li>
										<strong>Address Line 1:</strong>{' '}
										{watch('currentAddress.address1')}
									</li>
									<li>
										<strong>City:</strong> {watch('currentAddress.city')}
									</li>
									<li>
										<strong>Province:</strong>{' '}
										{watch('currentAddress.province')}
									</li>
									<li>
										<strong>Country:</strong> {watch('currentAddress.country')}
									</li>
									<li>
										<strong>Organization:</strong>{' '}
										{watch('contacts.organization')}
									</li>
									<li>
										<strong>Phone Number:</strong>{' '}
										{watch('contacts.phoneNumber')}
									</li>
									<li>
										<strong>Work Number:</strong> {watch('contacts.workNumber')}
									</li>
								</ul>

								<div className="flex justify-center scale-75 sm:scale-90 mr-[210px] sm:mr-[0px]">
									<ReCAPTCHA
										sitekey={conf.reCaptchaKey}
										onChange={onCaptchaChange}
									/>
								</div>

								{errors.recaptcha && (
									<p className="text-red-500 text-center mt-2">
										{errors.recaptcha.message}
									</p>
								)}
							</div>
						</div>
					</TabsContent>

					{/* Navigation Buttons */}
					<div className="p-4 flex justify-evenly">
						{currentStep > 1 && (
							<button
								type="button"
								onClick={handlePrevStep}
								className="w-[100px] bg-primary text-white px-4 py-2 rounded-md">
								Previous
							</button>
						)}
						<button
							type={currentStep === 5 ? 'submit' : 'button'}
							onClick={handleNextStep}
							disabled={currentStep === 4 && !recaptchaToken ? true : false}
							className={`w-[100px] text-white px-4 py-2 rounded-md 
							${currentStep === 4 && !recaptchaToken ? 'bg-gray-400' : 'bg-primary'}
							${currentStep === 4 && !recaptchaToken ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
							{currentStep === 4 ? 'Submit' : 'Next'}
						</button>
					</div>
				</Tabs>
			</form>
		)
	}

	return (
		<Layout>
			<img
				src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
				alt=""
				className="h-64 w-full object-cover"
			/>
			{isSubmit ? (
				<div className="min-h-[35vh] flex flex-col items-center justify-center">
					<h1 className="landing-page-title">You have successfully Signed!</h1>
					<div className={'text-lg'}>Use the button below to Login</div>
					<Button className={'mt-4'}>
						<a href="/">{message.home}</a>
					</Button>
				</div>
			) : (
				<>
					<div className={'flex flex-col justify-center items-center p-7'}>
						<div className={' text-2xl font-extrabold'}>Sign Up Your User Account</div>
						<div className={'text-lg'}>Fill all form field to go to next step</div>
					</div>
					<div className={'min-h-[460px] flex justify-center items-center mb-4'}>
						{showRegStatus()}
					</div>
				</>
			)}
		</Layout>
	)
}

export default Register
