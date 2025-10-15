import { Input } from '@/components/ui/input'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Bell, Key, Lock, Mail, Save, Shield, User, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SecurityFormData {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

interface SecurityFormErrors {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

const Security = () => {
	// Security form state
	const [securityForm, setSecurityForm] = useState<SecurityFormData>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})
	const [securityErrors, setSecurityErrors] = useState<SecurityFormErrors>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	})

	// Handle security form input changes
	const handleSecurityChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setSecurityForm({
			...securityForm,
			[name]: value,
		})

		// Clear error when user types
		if (securityErrors[name as keyof SecurityFormErrors]) {
			setSecurityErrors({
				...securityErrors,
				[name]: '',
			})
		}
	}

	// Validate security form
	const validateSecurityForm = (): boolean => {
		let isValid = true
		const newErrors: SecurityFormErrors = {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		}

		if (securityForm.currentPassword.length < 8) {
			newErrors.currentPassword = 'Password must be at least 8 characters.'
			isValid = false
		}

		if (securityForm.newPassword.length < 8) {
			newErrors.newPassword = 'Password must be at least 8 characters.'
			isValid = false
		}

		if (securityForm.confirmPassword.length < 8) {
			newErrors.confirmPassword = 'Password must be at least 8 characters.'
			isValid = false
		} else if (securityForm.newPassword !== securityForm.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match.'
			isValid = false
		}

		setSecurityErrors(newErrors)
		return isValid
	}

	// Handle security form submission
	const handleSecuritySubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (validateSecurityForm()) {
			console.log('Security form submitted:', securityForm)
			// Submit security data to server
		}
	}
	return (
		<form onSubmit={handleSecuritySubmit} className="space-y-6">
			<div className="space-y-2">
				<label htmlFor="currentPassword" className="text-sm font-medium">
					Current Password
				</label>
				<div className="flex items-center">
					<Key className="mr-2 h-4 w-4 text-gray-500" />
					<Input
						id="currentPassword"
						name="currentPassword"
						type="password"
						placeholder="Enter current password"
						value={securityForm.currentPassword}
						onChange={handleSecurityChange}
					/>
				</div>
				{securityErrors.currentPassword && <p className="text-sm text-red-500">{securityErrors.currentPassword}</p>}
			</div>

			<div className="space-y-2">
				<label htmlFor="newPassword" className="text-sm font-medium">
					New Password
				</label>
				<div className="flex items-center">
					<Lock className="mr-2 h-4 w-4 text-gray-500" />
					<Input
						id="newPassword"
						name="newPassword"
						type="password"
						placeholder="Enter new password"
						value={securityForm.newPassword}
						onChange={handleSecurityChange}
					/>
				</div>
				{securityErrors.newPassword && <p className="text-sm text-red-500">{securityErrors.newPassword}</p>}
			</div>

			<div className="space-y-2">
				<label htmlFor="confirmPassword" className="text-sm font-medium">
					Confirm Password
				</label>
				<div className="flex items-center">
					<Lock className="mr-2 h-4 w-4 text-gray-500" />
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						placeholder="Confirm new password"
						value={securityForm.confirmPassword}
						onChange={handleSecurityChange}
					/>
				</div>
				{securityErrors.confirmPassword && <p className="text-sm text-red-500">{securityErrors.confirmPassword}</p>}
			</div>

			<Button type="submit" className="bg-black hover:bg-gray-800">
				<Save className="mr-2 h-4 w-4" />
				Update Password
			</Button>
		</form>
	)
}

export default Security
