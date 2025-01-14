import axios from 'axios'
import { atom, useAtom } from 'jotai'
import { ReactNode, useEffect } from 'react'

const authTokenAtom = atom(localStorage.getItem('jwtToken'))
const loadingAtom = atom(false)
const errorAtom = atom(null)

export const EasyloadAuthProvider = ({ children }: { children?: ReactNode }) => {
	const [authToken, setAuthToken] = useAtom(authTokenAtom)
	const [loading, setLoading] = useAtom(loadingAtom)
	const [error, setError] = useAtom(errorAtom)

	const authenticate = async (tenant: string, password: string) => {
		setLoading(true)
		try {
			const response = await axios.post(
				'https://easyload-dev.azurewebsites.net/api/Auth/Token',
				{ tenant, password }
			)
			const { token } = response.data
			localStorage.setItem('jwtToken', token)
			setAuthToken(token)
		} catch (err: any) {
			setError(err.response?.data?.message || 'Authentication failed.')
			console.error('Authentication Error:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!authToken) {
			// Replace with your tenant and password logic.
			const tenant = 'your-tenant'
			const password = 'your-password'
			authenticate(tenant, password)
		}
	}, [authToken])

	return <>{children}</>
}

export const useAuth = () => {
	const [authToken] = useAtom(authTokenAtom)
	const [loading] = useAtom(loadingAtom)
	const [error] = useAtom(errorAtom)

	return { authToken, loading, error }
}
