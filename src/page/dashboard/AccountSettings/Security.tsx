import { Input } from '@/components/ui/input'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Bell, Key, Lock, Mail, Save, Shield, User, UserCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { convertXMLToJson, getCookieValue } from '@/lib/utils'
import axios from 'axios'
import useJSONData from '@/hooks/useJSONData'
import { MWI_RESFUL_RES } from '@/components/common/event-calendar/Constants'
import X2JS from 'x2js'

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
	const { records } = useJSONData({ selector: '#xml_record' })
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
	const handleSecurityChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target
		setSecurityForm({
			...securityForm,
			[name]: value,
		})
		if (securityErrors[name as keyof SecurityFormErrors]) {
			setSecurityErrors({
				...securityErrors,
				[name]: '',
			})
		}
	}

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

	const getPatron = () =>
		axios({
			method: 'GET',
			url: getCookieValue('HOME_SESSID') + '?MANIPXMLRECORD&KEY=C_CLIENT_NUMBER&VALUE=' + records[0]?.client_number + '&DATABASE=PATRON&READ=Y',
			headers: { 'Content-Type': 'text/xml' },
			timeout: 300000,
		})

	const patchPatron = () =>
		axios({
			method: 'POST',
			url: getCookieValue('HOME_SESSID') + '?MANIPXMLRECORD&KEY=C_CLIENT_NUMBER&VALUE=' + records[0]?.client_number + '&DATABASE=PATRON',
			headers: { 'Content-Type': 'text/xml' },
			data: `<?xml version="1.0" encoding="UTF-8"?><RECORD><PATRON_PID>${securityForm.newPassword}</PATRON_PID></RECORD>`,
			timeout: 300000,
		})

	const handleSecuritySubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		if (!validateSecurityForm()) return

		try {
			const res = await getPatron()
			const conToJson: any = await convertXMLToJson(res.data)
			const jsonObj = conToJson[MWI_RESFUL_RES].record

			if (jsonObj.PATRON_PID !== securityForm.currentPassword) {
				setSecurityErrors({
					currentPassword: 'Current Password is wrong',
					newPassword: '',
					confirmPassword: '',
				})
				return
			}

			await patchPatron()
		} catch (err) {
			console.error('Error:', err)
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
