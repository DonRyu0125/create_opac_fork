import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

interface AdminUser {
	id: string
	name: string
	email: string
	role: 'admin' // Ensure only admin users are handled here
	// add other admin-specific properties as needed
}

interface AdminAuthContextType {
	adminUser: AdminUser | null
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => void
	isAuthenticated: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
	const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

	const signIn = useCallback(async (email: string, password: string) => {
		try {
			console.log('sign in')
			setAdminUser({
				email: 'test',
				id: 'test',
				name: 'test',
				role: 'admin',
			})
			// Implement actual admin sign-in logic here, e.g., API request
			// const response = await fetch('/api/admin/auth/signin', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ email, password }),
			// })
			// if (response.ok) {
			// 	const adminData = await response.json()
			// 	setAdminUser(adminData)
			// } else {
			// 	throw new Error('Admin sign-in failed')
			// }
		} catch (error) {
			console.error('Admin sign-in error:', error)
			// Handle sign-in error, e.g., show toast or notification
		}
	}, [])

	const signOut = useCallback(() => {
		// Implement actual admin sign-out logic here, e.g., API request
		setAdminUser(null)
	}, [])

	const isAuthenticated = !!adminUser

	const isAdminLoginPath = window.location.pathname.includes('/admin/login.html')

	useEffect(() => {
		if (isAdminLoginPath && isAuthenticated) {
			window.location.assign('/admin/index.html')
		}
		if (!isAdminLoginPath && !isAuthenticated) {
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
