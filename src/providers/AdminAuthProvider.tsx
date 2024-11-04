import axios from 'axios'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

interface AdminUser {
	id: string
	name: string
	email: string
	role: 'admin'
	// Add other admin-specific properties as needed
}

interface AdminAuthContextType {
	adminUser: AdminUser | null
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => void
	isAuthenticated: boolean
}

async function hashPayload(payload: object) {
	const jsonString = JSON.stringify(payload)
	const encoder = new TextEncoder()
	const data = encoder.encode(jsonString)
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

const CREDENTIAL_KEY = 'credential'
const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
	const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const signIn = useCallback(async (username: string, password: string) => {
		const url = `/scripts/mwimain.dll?logon&application=UNION_VIEW&language=144&file=[OPAC]admin/login-success.html`
		const payload = { USERNAME: username, USERPASSWORD: password }

		try {
			const loginRequest = await axios.post(url, { ...payload })
			if (loginRequest.status === 200) {
				const response = JSON.parse(loginRequest.data.trim())
				if (response.status === 'success') {
					const hash = await hashPayload(payload)
					window.localStorage.setItem(CREDENTIAL_KEY, hash)
					setIsAuthenticated(true)
					setAdminUser({
						id: username,
						name: username,
						email: username,
						role: 'admin',
					})
				}
			}
		} catch (error) {
			console.error('Admin sign-in error:', error)
		}
	}, [])

	const signOut = useCallback(() => {
		window.localStorage.removeItem(CREDENTIAL_KEY)
		setIsAuthenticated(false)
		setAdminUser(null)
	}, [])

	useEffect(() => {
		const storedHash = localStorage.getItem(CREDENTIAL_KEY)
		if (storedHash) {
			setIsAuthenticated(true)
		}
	}, [])

	const isAdminLoginPath = window.location.pathname.includes('/admin/login.html')

	useEffect(() => {
		if (isAdminLoginPath && isAuthenticated) {
			window.location.assign('/admin/index.html')
		} else if (!isAdminLoginPath && !isAuthenticated) {
			window.location.assign('/admin/login.html')
		}
	}, [isAdminLoginPath, isAuthenticated])

	return (
		<AdminAuthContext.Provider value={{ adminUser, signIn, signOut, isAuthenticated }}>
			{children}
		</AdminAuthContext.Provider>
	)
}

export const useAdminAuth = (): AdminAuthContextType => {
	const context = useContext(AdminAuthContext)
	if (!context) {
		throw new Error('useAdminAuth must be used within an AdminAuthProvider')
	}
	return context
}
