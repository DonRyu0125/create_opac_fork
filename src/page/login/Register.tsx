import Layout from '@/components/layouts'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import useConstants from '@/hooks/useConstants'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { CircleCheck } from 'lucide-react'
import useJSONData from '@/hooks/useJSONData'
import Spinner from '@/components/common/event-calendar/Spinner'

type ClientFormData = {
	C_TITLE: string
	C_NAME_FIRST: string
	C_NAME_LAST: string
	C_EMAIL: string
	C_STREET: string
	C_CITY: string
	C_PROV_STATE: string
	C_POSTAL_ZIP: string
	C_COUNTRY: string
	C_RES_PURPOSE: string
	C_RES_SUBJECTS: string
	PATRON_PID: string
	PATRON_PID_RE: string
	recaptcha: string
}

export const PASSWORD_MIN_LENGTH = 1

const Register = () => {
	const [loading, setLoading] = useState(false)
	const { records } = useJSONData({ selector: '#xml_record' })
	const [isSubmit, setIsSubmit] = useState(false)
	const conf = useConstants().config
	const [recaptchaToken, setRecaptchaToken] = useState<string>('')
	const { message } = useConstants()
	const [userData, setUserData] = useState<ClientFormData>({
		C_TITLE: '',
		C_NAME_FIRST: '',
		C_NAME_LAST: '',
		C_EMAIL: '',
		C_STREET: '',
		C_CITY: '',
		C_PROV_STATE: '',
		C_POSTAL_ZIP: '',
		C_COUNTRY: '',
		C_RES_PURPOSE: '',
		C_RES_SUBJECTS: '',
		PATRON_PID: '',
		PATRON_PID_RE: '',
		recaptcha: '',
	})
	const {
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			C_TITLE: '',
			C_NAME_FIRST: '',
			C_NAME_LAST: '',
			C_EMAIL: '',
			PATRON_PID: '',
			PATRON_PID_RE: '',
			C_STREET: '',
			C_CITY: '',
			C_PROV_STATE: '',
			C_POSTAL_ZIP: '',
			C_COUNTRY: '',
			C_RES_PURPOSE: '',
			C_RES_SUBJECTS: '',
			recaptcha: '',
		},
	})
	const [currentStep, setCurrentStep] = useState(1)
	const [isSaveRecordSent, setIsSaveRecordSent] = useState(false)
	const sendSkipRecord = async () => {
		try {
			await axios.post(`${records[0].skip_n_stop_record}`)
			console.log('SKIPRECORD sent to clean up resources')
		} catch (error) {
			console.error('Error sending SKIPRECORD:', error)
		}
	}

	useEffect(() => {
		const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string }) => {
			if (!isSaveRecordSent && !isSubmit) {
				sendSkipRecord()
				event.preventDefault()
				event.returnValue = ''
			}
		}
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [isSaveRecordSent])

	const getStepFields = (step: number) => {
		switch (step) {
			case 1:
				return [
					'C_EMAIL',
					'C_NAME_FIRST',
					'C_NAME_LAST',
					'PATRON_PID',
					'PATRON_PID_RE',
				] as const
			case 2:
				return ['C_STREET', 'C_CITY', 'C_PROV_STATE', 'C_POSTAL_ZIP', 'C_COUNTRY'] as const
			case 3:
				return ['C_RES_PURPOSE', 'C_RES_SUBJECTS'] as const
			default:
				return []
		}
	}

	///scripts/mwimain.dll?emailpassword&application=lma&language=144&from=noreplylma@minisisinc.com&subject=The%20London%20Archives%20Collections%20Catalogue%20-%20Password Reset&file=[www_lma]email_confirm.htm

	const onSubmit = async (data: ClientFormData) => {
		setIsSubmit(true)
		setUserData(data)
		setLoading(true)
		const formData = new FormData()
		formData.append('C_EMAIL', data.C_EMAIL)
		formData.append('C_NAME_FIRST', data.C_NAME_FIRST)
		formData.append('C_NAME_LAST', data.C_NAME_LAST)
		formData.append('PATRON_PID', data.PATRON_PID)
		formData.append('C_STREET', data.C_STREET)
		formData.append('C_CITY', data.C_CITY)
		formData.append('C_PROV_STATE', data.C_PROV_STATE)
		formData.append('C_POSTAL_ZIP', data.C_POSTAL_ZIP)
		formData.append('C_COUNTRY', data.C_COUNTRY)
		formData.append('C_RES_PURPOSE', data.C_RES_PURPOSE)
		formData.append('C_RES_SUBJECTS', data.C_RES_SUBJECTS)

		// save_n_stop_record need a return url but react doesn't need it so I add dummy &RETURN_URL=[OPAC]register-confirm.html
		return await axios
			.post(
				`${records[0].save_n_stop_record}&CLOSE=Y&RETURN_URL=[OPAC]register-confirm.html`,
				formData
			)
			.then((res) => {
				console.log('res',res)
				setIsSaveRecordSent(true)
				setLoading(false)
			})
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
			<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-200 p-5 rounded-md w-5/6">
				<Tabs value={`step${currentStep}`}>
					{/* Tabs List */}
					<TabsList className="bg-gray-400 p-5 min-h-[300px] md:min-h-[70px] flex flex-wrap justify-evenly mb-6 w-full text-white">
						{[
							{ value: 'step1', label: 'Step 1: Your Detail' },
							{ value: 'step2', label: 'Step 2: Current Address' },
							{ value: 'step3', label: 'Step 3: Survey' },
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
									message: 'Please enter a valid Email address',
								},
							})}
							placeholder="Email"
							className="border p-2 w-full mt-1"
						/>
						{errors.C_EMAIL && <p className="text-red-500">{errors.C_EMAIL.message}</p>}

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
									Confirm Password <span className="text-red-500">*</span>
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
					</TabsContent>

					{/* Step 2: Current Address */}
					<TabsContent value="step2" className="p-6 bg-white shadow-md rounded-md">
						<label className="font-semibold">
							Address 1 <span className="text-red-500">*</span>
						</label>
						<input
							{...register('C_STREET', {
								required: 'Current address is required',
							})}
							placeholder="Current Address"
							className="border p-2 w-full mt-1"
						/>
						{errors.C_STREET && (
							<p className="text-red-500">{errors.C_STREET.message}</p>
						)}
						<div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 mt-4">
							<div className="sm:col-span-1">
								<label className="font-semibold">
									City <span className="text-red-500">*</span>
								</label>
								<input
									{...register('C_CITY', {
										required: 'City is required',
									})}
									placeholder="City"
									className="border p-2 w-full mt-1"
								/>
								{errors.C_CITY && (
									<p className="text-red-500">{errors.C_CITY.message}</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Province / State <span className="text-red-500">*</span>
								</label>
								<input
									{...register('C_PROV_STATE', {
										required: 'Province is required',
									})}
									placeholder="Province"
									className="border p-2 w-full mt-1"
								/>
								{errors.C_PROV_STATE && (
									<p className="text-red-500">{errors.C_PROV_STATE.message}</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Postal Code / Zip Code <span className="text-red-500">*</span>
								</label>
								<input
									{...register('C_POSTAL_ZIP', {
										required: 'Postal Code is required',
									})}
									placeholder="Postal Code"
									className="border p-2 w-full mt-1"
								/>
								{errors.C_POSTAL_ZIP && (
									<p className="text-red-500">{errors.C_POSTAL_ZIP.message}</p>
								)}
							</div>

							<div className="sm:col-span-1">
								<label className="font-semibold">
									Country <span className="text-red-500">*</span>
								</label>
								<input
									{...register('C_COUNTRY', {
										required: 'Country is required',
									})}
									placeholder="Country"
									className="border p-2 w-full mt-1"
								/>
								{errors.C_COUNTRY && (
									<p className="text-red-500">{errors.C_COUNTRY.message}</p>
								)}
							</div>
						</div>
					</TabsContent>

					<TabsContent value="step3" className="p-6 bg-white shadow-md rounded-md">
						<div className="flex flex-col space-y-2">
							<label className="font-semibold">
								What is the main reason for wishing to visit?
							</label>
							<div className="flex flex-col space-y-2">
								<label className="inline-flex items-center">
									<input
										type="radio"
										{...register('C_RES_PURPOSE')}
										value="Personal leisure/recreation"
										className="form-checkbox h-5 w-5 text-blue-600"
									/>
									<span className="ml-2">Personal leisure/recreation</span>
								</label>
							</div>
							<div className="flex flex-col space-y-2">
								<label className="inline-flex items-center">
									<input
										type="radio"
										{...register('C_RES_PURPOSE')}
										value="Non-leisure personal or family business"
										className="form-checkbox h-5 w-5 text-blue-600"
									/>
									<span className="ml-2">
										Non-leisure personal or family business
									</span>
								</label>
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
										<strong>Email:</strong> {watch('C_EMAIL')}
									</li>
									<li>
										<strong>Full Name:</strong>{' '}
										{`${watch('C_NAME_FIRST')} ${watch('C_NAME_LAST')}`}
									</li>
									<li>
										<strong>Address Line 1:</strong> {watch('C_STREET')}
									</li>
									<li>
										<strong>City:</strong> {watch('C_CITY')}
									</li>
									<li>
										<strong>Province/State:</strong> {watch('C_PROV_STATE')}
									</li>
									<li>
										<strong>Country:</strong> {watch('C_COUNTRY')}
									</li>
									<li>
										<strong>Purpose:</strong> {watch('C_RES_PURPOSE')}
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
			{loading && (
				<div className="flex h-full items-center justify-center">
					<Spinner
						height={'h-full'}
						spinHeight={'h-20'}
						spinWidth={'w-20'}
						background={'bg-white'}
					/>
				</div>
			)}
			{isSubmit ? (
				<div className="min-h-[35vh] flex flex-col items-center justify-center p-8 text-center">
					<div className={'m-5'}>
						<CircleCheck className="w-16 h-16" />
					</div>
					<h1 className="landing-page-title">
						We have sent a verification EMAIL to '{userData.C_EMAIL}'
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
