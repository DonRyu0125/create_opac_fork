import PageAction from '@/components/common/PageAction'
import Spinner from '@/components/common/event-calendar/Spinner'
import Layout from '@/components/layouts'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

const Register = () => {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			yourDetail: {
				email: '',
				firstName: '',
				lastName: '',
				aorCard: '',
			},
			currentAddress: '',
			contacts: '',
			researchInterest: '',
			recaptcha: '',
		},
	})

	const [currentStep, setCurrentStep] = useState(1)

	const onSubmit = (data) => {
		console.log('Final Submitted Data:', data)
	}

	const getStepFields = (step) => {
		switch (step) {
			case 1:
				return ['yourDetail.email', 'yourDetail.firstName', 'yourDetail.lastName']
			case 2:
				return ['currentAddress']
			case 3:
				return ['contacts']
			case 4:
				return ['researchInterest']
			default:
				return []
		}
	}

	const handleNextStep = async () => {
		const stepValidation = await trigger(getStepFields(currentStep))
		if (stepValidation) {
			setCurrentStep((prev) => Math.min(prev + 1, 5))
		}
	}

	const handlePrevStep = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 1))
	}

	const handleRecaptcha = (token) => {
		setValue('recaptcha', token)
	}

	const showRegStatus = () => {
		return (
			<form onSubmit={handleSubmit(onSubmit)} className={'bg-gray-200 p-5 rounded-md'}>
				<Tabs value={`step${currentStep}`}>
					<TabsList className="bg-gray-400 p-5 min-h-[300px] sm:min-h-[70px] flex flex-wrap space-x-4 mb-6 w-full text-white">
						<TabsTrigger
							value="step1"
							className={`px-4 py-2 rounded-md ${currentStep > 1 ? 'bg-primary' : 'bg-gray-700'} w-full sm:w-auto`}
							onClick={() => setCurrentStep(1)}>
							Step 1: Your Detail
						</TabsTrigger>

						<TabsTrigger
							value="step2"
							className={`px-4 py-2 rounded-md ${currentStep > 2 ? 'bg-primary' : 'bg-gray-700'} w-full sm:w-auto`}
							onClick={() => currentStep > 1 && setCurrentStep(2)}>
							Step 2: Current Address
						</TabsTrigger>

						<TabsTrigger
							value="step3"
							className={`px-4 py-2 rounded-md ${currentStep > 3 ? 'bg-primary' : 'bg-gray-700'} w-full sm:w-auto`}
							onClick={() => currentStep > 2 && setCurrentStep(3)}>
							Step 3: Contacts
						</TabsTrigger>

						<TabsTrigger
							value="step4"
							className={`px-4 py-2 rounded-md ${currentStep === 4 ? 'bg-blue-600 ' : 'bg-gray-700'} w-full sm:w-auto`}
							onClick={() => currentStep > 3 && setCurrentStep(4)}>
							Step 4: Research Interest
						</TabsTrigger>

						<TabsTrigger
							value="step5"
							className={`px-4 py-2 rounded-md ${currentStep === 5 ? 'bg-blue-600 ' : 'bg-gray-700'} w-full sm:w-auto`}
							onClick={() => currentStep > 4 && setCurrentStep(5)}>
							Step 5: Confirmation
						</TabsTrigger>
					</TabsList>

					{/* Step 1: Your Detail */}
					<TabsContent value="step1" className="p-6 bg-white shadow-md rounded-md">
						<h2 className="text-lg font-semibold">Your Detail</h2>
						<input
							{...register('yourDetail.email', { required: 'Email is required' })}
							placeholder="Email*"
							className="border p-2 w-full"
						/>
						{errors.yourDetail?.email && (
							<p className="text-red-500">{errors.yourDetail.email.message}</p>
						)}

						<div className="flex space-x-4 mt-4">
							<div className="flex-1">
								<input
									{...register('yourDetail.firstName', {
										required: 'First Name is required',
									})}
									placeholder="First Name*"
									className="border p-2 w-full"
								/>
								{errors.yourDetail?.firstName && (
									<p className="text-red-500">
										{errors.yourDetail.firstName.message}
									</p>
								)}
							</div>
							<div className="flex-1">
								<input
									{...register('yourDetail.lastName', {
										required: 'Last Name is required',
									})}
									placeholder="Last Name*"
									className="border p-2 w-full"
								/>
								{errors.yourDetail?.lastName && (
									<p className="text-red-500">
										{errors.yourDetail.lastName.message}
									</p>
								)}
							</div>
						</div>
					</TabsContent>

					{/* Step 2: Current Address */}
					<TabsContent value="step2" className="p-6 bg-white shadow-md rounded-md">
						<h2 className="text-lg font-semibold">Current Address</h2>
						<input
							{...register('currentAddress', {
								required: 'Current address is required',
							})}
							placeholder="Enter your current address"
							className="border p-2 w-full"
						/>
						{errors.currentAddress && (
							<p className="text-red-500">{errors.currentAddress.message}</p>
						)}
					</TabsContent>

					{/* Step 3: Contacts */}
					<TabsContent value="step3" className="p-6 bg-white shadow-md rounded-md">
						<h2 className="text-lg font-semibold">Contacts</h2>
						<input
							{...register('contacts', { required: 'Contact details are required' })}
							placeholder="Enter your contact details"
							className="border p-2 w-full"
						/>
						{errors.contacts && (
							<p className="text-red-500">{errors.contacts.message}</p>
						)}
					</TabsContent>

					{/* Step 4: Research Interest */}
					<TabsContent value="step4" className="p-6 bg-white shadow-md rounded-md">
						<h2 className="text-lg font-semibold">Research Interest</h2>
						<input
							{...register('researchInterest', {
								required: 'Research interest is required',
							})}
							placeholder="Enter your research interest"
							className="border p-2 w-full"
						/>
						{errors.researchInterest && (
							<p className="text-red-500">{errors.researchInterest.message}</p>
						)}
					</TabsContent>

					{/* Step 5: Confirmation */}
					<TabsContent value="step5" className="p-6 bg-white shadow-md rounded-md">
						<h2 className="text-lg font-semibold">Confirmation</h2>
						<p>Review your details and complete the registration:</p>
						<ul className="list-disc pl-5">
							<li>
								<strong>Your Detail:</strong> {watch('yourDetail.email')},{' '}
								{watch('yourDetail.firstName')}, {watch('yourDetail.lastName')}
							</li>
							<li>
								<strong>Current Address:</strong> {watch('currentAddress')}
							</li>
							<li>
								<strong>Contacts:</strong> {watch('contacts')}
							</li>
							<li>
								<strong>Research Interest:</strong> {watch('researchInterest')}
							</li>
						</ul>

						<ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={handleRecaptcha} />
						{errors.recaptcha && (
							<p className="text-red-500">Please complete the CAPTCHA.</p>
						)}
					</TabsContent>
					<div className="p-4 flex justify-evenly">
						<button
							type="button"
							onClick={handlePrevStep}
							className="bg-primary text-white px-4 py-2 rounded-md">
							Previous
						</button>
						<button
							type="button"
							onClick={handleNextStep}
							className="bg-primary text-white px-4 py-2 rounded-md">
							Next
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
			{loading ? (
				<div className="flex h-full items-center justify-center">
					<Spinner
						height={'h-full'}
						spinHeight={'h-20'}
						spinWidth={'w-20'}
						background={'bg-white'}
					/>
				</div>
			) : (
				<div className={'min-h-[400px] 2xl:min-h-[700px] flex justify-center items-center'}>
					{showRegStatus()}
				</div>
			)}
		</Layout>
	)
}

export default Register
