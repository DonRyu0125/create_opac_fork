import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Bell, CheckCircle, Key, LoaderCircle, Lock, Mail, Save, Shield, User, UserCog } from 'lucide-react'
import useJSONData from '@/hooks/useJSONData'
import axios from 'axios'
import { encodeObj, getCookieValue, getSessionID } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

// Define interfaces for form data and errors
interface ProfileFormData {
	firstName: string
	lastName: string
	email: string
}

interface ProfileFormErrors {
	name: string
	email: string
}

const Profile = () => {
	const { records } = useJSONData({ selector: '#xml_record' })
	const [countdown, setCountdown] = useState(10)
	const [loading, setLoadting] = useState(false)
	const [profileForm, setProfileForm] = useState<ProfileFormData>({
		firstName: records[0].first_name,
		lastName: records[0].last_name,
		email: records[0].email,
	})
	const [profileErrors, setProfileErrors] = useState<ProfileFormErrors>({
		name: '',
		email: '',
	})
	const [changedEmail, setChangedEmail] = useState(false)

	useEffect(() => {
		if (!changedEmail) return
		const timer = setInterval(() => {
			setCountdown((prev) => prev - 1)
		}, 1000)

		const redirect = setTimeout(() => {
			window.location.href = '/'
		}, 4000)

		return () => {
			clearInterval(timer)
			clearTimeout(redirect)
		}
	}, [changedEmail])

	const handleProfileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setProfileForm({
			...profileForm,
			[name]: value,
		})

		if (profileErrors[name as keyof ProfileFormErrors]) {
			setProfileErrors({
				...profileErrors,
				[name]: '',
			})
		}
	}

	// Validate profile form
	const validateProfileForm = (): boolean => {
		const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		let isValid = true
		const newErrors: ProfileFormErrors = { name: '', email: '' }

		if (profileForm.firstName.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters.'
			isValid = false
		}

		if (!regex.test(profileForm.email)) {
			newErrors.email = 'Please enter a valid email address.'
			isValid = false
		}

		setProfileErrors(newErrors)
		return isValid
	}

	const handleProfileSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (!validateProfileForm()) return
		setLoadting(true)
		axios({
			method: 'POST',
			url: getCookieValue('HOME_SESSID') + '?MANIPXMLRECORD&KEY=C_CLIENT_NUMBER&VALUE=' + records[0]?.client_number + '&DATABASE=PATRON',
			headers: { 'Content-Type': 'text/xml' },
			data: `<?xml version="1.0" encoding="UTF-8"?><RECORD><P_FIRST_NAME>${profileForm.firstName}</P_FIRST_NAME>
			<P_LAST_NAME>${profileForm.lastName}</P_LAST_NAME>
			</RECORD>`,
		})
			.then(() => {
				setLoadting(false)
				window.location.reload()
			})
			.catch(() => {
				setLoadting(false)
				toast({
					title: `Error updating profile. Please try again.`,
					duration: 1000,
				})
			})
	}

	const submitEmailChange = async () => {
		let HOME_SESSID = getSessionID()
		let is_french = getCookieValue('my_lang') === '145' ? true : false
		const encoded = encodeObj(JSON.stringify({
			client_number: records[0].client_number,
			email: profileForm.email,
		}))
		setChangedEmail(true)
		return await axios
			.post(
				`${HOME_SESSID}?SAVE_MAIL_FORM&TEMPLATE=[OPAC_EMAIL_TMP]${is_french ? 'EmailChgConfrim_fr.txt' : 'EmailChgConfirm.txt'}&FROM_DEFAULT=noreply@minisisinc.com&TO_DEFAULT=${profileForm.email}&SUBJECT_DEFAULT=${'Email Change Confirmation'}`,
				{
					client_number:  records[0].client_number,
					EMAIL_CHG_LANDING_PAGE_URL:`${window.location.protocol}//${window.location.hostname}/reset-email.html`,
					email: profileForm.email,
					encoded,
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			)
			.then(() => {
				setChangedEmail(false)
			})
	}

	return (
		<>
			{changedEmail ? (
				<section className="flex items-center justify-center space-y-6 min-h-[364px]">
					<div className="text-center space-y-4">
						<h1 className="flex justify-center items-center text-2xl font-bold text-black">
							<span className="mr-3">
								<CheckCircle className="mr-3 h-6 w-6 text-black" />
							</span>
							We sent a confirmation email
						</h1>
						<p className="mt-6 text-lg text-black">
							Please check your email to finish changing your email address.
							<a className="font-semibold" href="/">
								log in again
							</a>
							.
						</p>
						<p className="mt-4 text-black">
							Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
						</p>
					</div>
				</section>
			) : (
				<>
					<form onSubmit={handleProfileSubmit} className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="name" className="text-sm font-medium">
								Full Name
							</label>
							<div className="flex items-center w-full justify-between w-[70%]">
								<div className="flex items-center w-[40%]">
									<User className="mr-2 h-4 w-4 text-gray-500" />
									<Input
										id="firstName"
										name="firstName"
										placeholder="Enter your first name"
										value={profileForm.firstName}
										onChange={handleProfileChange}
									/>
								</div>
								<Input
									className="w-[50%]"
									id="lastName"
									name="lastName"
									placeholder="Enter your last name"
									value={profileForm.lastName}
									onChange={handleProfileChange}
								/>
							</div>
							{profileErrors.name && <p className="text-sm text-red-500">{profileErrors.name}</p>}
						</div>

						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email Address
							</label>
							<div className="flex items-center">
								<Mail className="mr-2 h-4 w-4 text-gray-500" />
								<Input
									id="email"
									name="email"
									placeholder="Enter your email"
									value={profileForm.email}
									onChange={handleProfileChange}
								/>
							</div>
							<p className="text-sm text-gray-500">This email will be used for account notifications.</p>
							{profileErrors.email && <p className="text-sm text-red-500">{profileErrors.email}</p>}
						</div>

						<Button type="submit" className="bg-black hover:bg-gray-800">
							{loading ? (
								<>
									<LoaderCircle />
								</>
							) : (
								<>
									<Save className="mr-2 h-4 w-4" />
									Save Profile
								</>
							)}
						</Button>
					</form>
					<div className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email Address
							</label>
							<div className="flex items-center">
								<Mail className="mr-2 h-4 w-4 text-gray-500" />
								<Input
									id="email"
									name="email"
									placeholder="Enter your email"
									value={profileForm.email}
									onChange={handleProfileChange}
								/>
							</div>
							<p className="text-sm text-gray-500">This email will be used for account notifications.</p>
							{profileErrors.email && <p className="text-sm text-red-500">{profileErrors.email}</p>}
						</div>

						<Button className="bg-black hover:bg-gray-800" onClick={submitEmailChange}>
							<Save className="mr-2 h-4 w-4" />
							Change Email
						</Button>
					</div>
				</>
			)}
		</>
	)
}

export default Profile
