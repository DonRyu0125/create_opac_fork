import Layout from '@/components/layouts'
import React, { useState } from 'react'
import { cn, encodeObj, getHomeSessionID } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useConstants from '@/hooks/useConstants'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import useConstants from '@/hooks/useConstants'
import { Button } from '@/components/ui/button'

type FormData = {
	C_EMAIL: string
	C_NAME_FIRST: string
	C_NAME_LAST: string
	// cardNumber?: string
	// PATRON_PID: string
	// retypePassword: string
	// address1: string
	// city: string
	// province: string
	// postalCode: string
	// country: string
	// organization?: string
	// workNumber?: string
	// phoneNumber: string
	// recaptcha: string
}

const PASSWORD_MIN_LENGTH = 1
const REG_CONFIRM_LANDING_PAGE_URL = `${window.location.hostname}/reg-confirm.html`
const REGISTRATION_CMT_EMAIL_TITLE = "Don't forget to complete the account!"
// C_TITLE: Ms
// C_NAME_FIRST: Alice
// C_NAME_LAST: Smith
// C_EMAIL: donryu1031@gmail.com
// C_STREET: 1122 smith
// C_STREET2:
// C_STREET3:
// C_CITY: London
// C_PROV_STATE:
// C_POSTAL_ZIP: 123123
// C_COUNTRY: United Kingdom
// C_RES_PURPOSE: Work in connection with employment
// C_RES_SUBJECT.6: Political/diplomatic history
// PATRON_PID: Sktjsghks12
// PATRON_PID: Sktjsghks12

// {
//     "C_EMAIL": "asd@sd.com",
//     "C_NAME_FIRST": "1",
//     "C_NAME_LAST": "1",
//     "cardNumber": "1",
//     "PATRON_PID": "1",
//     "retypePassword": "1",
//     "address1": "1",
//     "city": "1",
//     "province": "1",
//     "postalCode": "1",
//     "country": "1",
//     "organization": "",
//     "workNumber": "1",
//     "phoneNumber": "1",
//     "recaptcha": ""
// }

const Register = () => {
	const [loading, setLoading] = useState(false)
	const [isSubmit, setIsSubmit] = useState(false)
	const conf = useConstants().config
	const { logo } = useConstants().config
	const [recaptchaToken, setRecaptchaToken] = useState<string>('')
	const { message } = useConstants()
	const [userData, setUserData] = useState<FormData>({
		C_EMAIL: '',
		C_NAME_FIRST: '',
		C_NAME_LAST: '',
		// cardNumber: '',
		// PATRON_PID: '',
		// retypePassword: '',
		// address1: '',
		// city: '',
		// province: '',
		// postalCode: '',
		// country: '',
		// organization: '',
		// workNumber: '',
		// phoneNumber: '',
		// recaptcha: '',
	})
	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			C_EMAIL: '',
			C_NAME_FIRST: '',
			C_NAME_LAST: '',
			// cardNumber: '',
			// PATRON_PID: '',
			// retypePassword: '',
			// address1: '',
			// city: '',
			// province: '',
			// postalCode: '',
			// country: '',
			// organization: '',
			// workNumber: '',
			// phoneNumber: '',
			// recaptcha: '',
		},
	})
	const [currentStep, setCurrentStep] = useState(1)
	const HOME_SESSID = getHomeSessionID()
	const getStepFields = (step: number) => {
		switch (step) {
			case 1:
				return [
					'C_EMAIL',
					'C_NAME_FIRST',
					'C_NAME_LAST',
					// 'cardNumber',
					// 'PATRON_PID',
					// 'retypePassword',
				] as const
			// case 2:
			// 	return ['address1', 'city', 'province', 'postalCode', 'country'] as const
			// case 3:
			// 	return ['organization', 'workNumber', 'phoneNumber'] as const
			// default:
			// 	return []
		}
	}

	const onSubmit = async (data: FormData) => {
		setIsSubmit(true)
		setUserData(data)
		console.log('Final Submitted Data:', data)


	return await axios
			.post(
				`${HOME_SESSID}?SAVERECORD`,
				{...data},
				{
					headers: {
						'Content-Type': 'text/xml',
					},
				}
			)
			.catch((error) => {
				throw error
			})
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
			<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 p-5 rounded-md w-5/6" method='post' action={`${HOME_SESSID}?SAVERECORD`}>
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
							{...register('C_EMAIL', {
								required: 'Email is required',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: 'Please enter a valid C_EMAIL address',
								},
							})}
							placeholder="Email"
							className="border p-2 w-full mt-1"
						/>
						{errors.C_EMAIL && <p className="text-red-500">{errors.C_EMAIL.message}</p>}

						{/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									Password <span className="text-red-500">*</span>
								</label>
								<input
									type="PATRON_PID"
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
									Retype Password <span className="text-red-500">*</span>
								</label>
								<input
									type="PATRON_PID"
									{...register('retypePassword', {
										required: 'Please confirm your PATRON_PID',
										validate: (value) =>
											value === watch('PATRON_PID') || 'Passwords do not match',
									})}
									placeholder="Retype Password"
									className="border p-2 w-full mt-1"
								/>
								{errors.retypePassword && (
									<p className="text-red-500">{errors.retypePassword.message}</p>
								)}
							</div>
						</div> */}
						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									First Name <span className="text-red-500">*</span>
								</label>
								<input
									{...register('C_NAME_FIRST', {
										required: 'First Name is required',
									})}
									placeholder="First Name"
									className="border p-2 w-full mt-1"
								/>
								{errors.C_NAME_FIRST && (
									<p className="text-red-500">{errors.C_NAME_FIRST.message}</p>
								)}
							</div>

							<div className="flex-1">
								<label className="font-semibold">
									Last Name <span className="text-red-500">*</span>
								</label>
								<input
									{...register('C_NAME_LAST', {
										required: 'Last Name is required',
									})}
									placeholder="Last Name"
									className="border p-2 w-full mt-1"
								/>
								{errors.C_NAME_LAST && (
									<p className="text-red-500">{errors.C_NAME_LAST.message}</p>
								)}
							</div>
						</div>

						<label className="font-semibold">Card #</label>
						{/* <input
							{...register('cardNumber')}
							placeholder="Card #"
							className="border p-2 w-full mt-1"
						/> */}
					</TabsContent>

					{/* Step 2: Current Address */}
					<TabsContent value="step2" className="p-6 bg-white shadow-md rounded-md">
						{/* <label className="font-semibold">
							Address 1 <span className="text-red-500">*</span>
						</label>
						<input
							{...register('address1', {
								required: 'Current address is required',
							})}
							placeholder="Current Address"
							className="border p-2 w-full mt-1"
						/>
						{errors.address1 && (
							<p className="text-red-500">{errors.address1.message}</p>
						)}
						<div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mt-4">
							<div className="sm:col-span-1">
								<label className="font-semibold">
									City <span className="text-red-500">*</span>
								</label>
								<input
									{...register('city', {
										required: 'City is required',
									})}
									placeholder="City"
									className="border p-2 w-full mt-1"
								/>
								{errors.city && (
									<p className="text-red-500">{errors.city.message}</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Province / State <span className="text-red-500">*</span>
								</label>
								<input
									{...register('province', {
										required: 'Province is required',
									})}
									placeholder="Province"
									className="border p-2 w-full mt-1"
								/>
								{errors.province && (
									<p className="text-red-500">{errors.province.message}</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Postal Code / Zip Code <span className="text-red-500">*</span>
								</label>
								<input
									{...register('postalCode', {
										required: 'Postal Code is required',
									})}
									placeholder="Postal Code"
									className="border p-2 w-full mt-1"
								/>
								{errors.postalCode && (
									<p className="text-red-500">{errors.postalCode.message}</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Country <span className="text-red-500">*</span>
								</label>
								<input
									{...register('country', {
										required: 'Country is required',
									})}
									placeholder="Country"
									className="border p-2 w-full mt-1"
								/>
								{errors.country && (
									<p className="text-red-500">{errors.country.message}</p>
								)}
							</div>
						</div> */}
					</TabsContent>

					{/* Step 3: Contacts */}
					<TabsContent value="step3" className="p-6 bg-white shadow-md rounded-md">
						{/* <label className="font-semibold">
							Organization <span className="text-red-500"></span>
						</label>
						<input
							{...register('organization')}
							placeholder="Organization"
							className="border p-2 w-full mt-1"
						/>
						<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
							<div className="flex-1">
								<label className="font-semibold">
									Work Number <span className="text-red-500">*</span>
								</label>
								<input
									{...register('workNumber', {
										required: 'Work Number is required',
									})}
									placeholder="Work Number"
									className="border p-2 w-full mt-1"
								/>
								{errors.workNumber && (
									<p className="text-red-500">{errors.workNumber.message}</p>
								)}
							</div>
							<div className="flex-1">
								<label className="font-semibold">
									Phone Number <span className="text-red-500">*</span>
								</label>
								<input
									{...register('phoneNumber', {
										required: 'Phone Number is required',
									})}
									placeholder="Phone Number"
									className="border p-2 w-full mt-1"
								/>
								{errors.phoneNumber && (
									<p className="text-red-500">{errors.phoneNumber.message}</p>
								)}
							</div>
						</div> */}
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
										<strong>Email:</strong> {watch('C_EMAIL')}
									</li>
									<li>
										<strong>Full Name:</strong>{' '}
										{`${watch('C_NAME_FIRST')} ${watch('C_NAME_LAST')}`}
									</li>
									{/* <li>
										<strong>Address Line 1:</strong> {watch('address1')}
									</li>
									<li>
										<strong>City:</strong> {watch('city')}
									</li>
									<li>
										<strong>Province:</strong> {watch('province')}
									</li>
									<li>
										<strong>Country:</strong> {watch('country')}
									</li>
									<li>
										<strong>Organization:</strong> {watch('organization')}
									</li>
									<li>
										<strong>Phone Number:</strong> {watch('phoneNumber')}
									</li>
									<li>
										<strong>Work Number:</strong> {watch('workNumber')}
									</li> */}
								</ul>

								<div className="flex justify-center scale-75 sm:scale-90 mr-[210px] sm:mr-[0px]">
									<ReCAPTCHA
										sitekey={conf.reCaptchaKey}
										onChange={onCaptchaChange}
									/>
								</div>

								{/* {errors.recaptcha && (
									<p className="text-red-500 text-center mt-2">
										{errors.recaptcha.message}
									</p>
								)} */}
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
				<div className="min-h-[35vh] flex flex-col items-center justify-center p-8 text-center">
					<div className={'m-5'}>
						<CircleCheck className="w-16 h-16" />
					</div>
					<h1 className="landing-page-title">
						We have sent a verification C_EMAIL to '{userData.C_EMAIL}'
					</h1>
					<div className={'text-xl m-4'}>
						Please check the emtail for further instructions
					</div>
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
