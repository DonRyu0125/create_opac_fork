import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Bell, Key, Lock, Mail, Save, Shield, User, UserCog } from 'lucide-react'
import useJSONData from '@/hooks/useJSONData'

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
	const [activeTab, setActiveTab] = useState<string>('profile')

    
	// Handle profile form input changes
	const handleProfileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setProfileForm({
			...profileForm,
			[name]: value,
		})

		// Clear error when user types
		if (profileErrors[name as keyof ProfileFormErrors]) {
			setProfileErrors({
				...profileErrors,
				[name]: '',
			})
		}
	}


	// Profile form state
	const [profileForm, setProfileForm] = useState<ProfileFormData>({
		firstName: records[0].first_name,
		lastName: records[0].last_name,
		email: records[0].email,
	})
	const [profileErrors, setProfileErrors] = useState<ProfileFormErrors>({
		name: '',
		email: '',
	})

	// Validate profile form
	const validateProfileForm = (): boolean => {
		let isValid = true
		const newErrors: ProfileFormErrors = { name: '', email: '' }

		if (profileForm.firstName.trim().length < 2) {
			newErrors.name = 'Name must be at least 2 characters.'
			isValid = false
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(profileForm.email)) {
			newErrors.email = 'Please enter a valid email address.'
			isValid = false
		}

		setProfileErrors(newErrors)
		return isValid
	}
	// Handle profile form submission
	const handleProfileSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (validateProfileForm()) {
			console.log('Profile form submitted:', profileForm)
			// Submit profile data to server
		}
	}
	return (
		<form onSubmit={handleProfileSubmit} className="space-y-6">
			<div className="space-y-2">
				<label htmlFor="name" className="text-sm font-medium">
					Full Name
				</label>
				<div className="flex items-center">
					<User className="mr-2 h-4 w-4 text-gray-500" />
					<Input id="name" name="name" placeholder="Enter your name" value={profileForm.firstName} onChange={handleProfileChange} />
					<Input id="name" name="name" placeholder="Enter your name" value={profileForm.lastName} onChange={handleProfileChange} />
				</div>
				{profileErrors.name && <p className="text-sm text-red-500">{profileErrors.name}</p>}
			</div>

			<div className="space-y-2">
				<label htmlFor="email" className="text-sm font-medium">
					Email Address
				</label>
				<div className="flex items-center">
					<Mail className="mr-2 h-4 w-4 text-gray-500" />
					<Input id="email" name="email" placeholder="Enter your email" value={profileForm.email} onChange={handleProfileChange} />
				</div>
				<p className="text-sm text-gray-500">This email will be used for account notifications.</p>
				{profileErrors.email && <p className="text-sm text-red-500">{profileErrors.email}</p>}
			</div>

			<Button type="submit" className="bg-black hover:bg-gray-800">
				<Save className="mr-2 h-4 w-4" />
				Save Profile
			</Button>
		</form>
	)
}

export default Profile
