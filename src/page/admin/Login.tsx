import Button from '@/components/common/admin/Button'
import AdminLayout from '@/components/layouts/admin'
import { Input } from '@/components/ui/input'
import { useAdminAuth } from '@/providers/AdminAuthProvider'
import { useRef } from 'react'

const AdminLogin = () => {
	return (
		<AdminLayout>
			<div className="w-full max-w-3xl space-y-6 text-center mx-auto">
				<h1 className="text-4xl font-bold text-slate-700 md:text-5xl">
					MINISIS Template Toolkit
				</h1>

				<p className="text-lg text-slate-600">
					Welcome to MTT. Please login with your provided credential to access your
					account.
				</p>

				<AdminLoginForm />
			</div>
		</AdminLayout>
	)
}

const AdminLoginForm = () => {
	const { signIn } = useAdminAuth()
	const usernameRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const username = usernameRef?.current?.value || ''
	const password = passwordRef?.current?.value || ''
	return (
		<form className="space-y-4">
			<Input
				ref={usernameRef}
				className="max-w-xl mx-auto h-12 text-lg"
				placeholder="Enter your Username"
				type="text"
				required
			/>
			<Input
				ref={passwordRef}
				className="max-w-xl mx-auto h-12 text-lg"
				placeholder="Enter your Password"
				type="password"
				required
			/>

			<Button
				onClick={() => signIn(username, password)}
				className="h-12 px-8 text-lg text-white bg-[#0B2C4D] hover:bg-[#0B2C4D]/90">
				Login
			</Button>
		</form>
	)
}

export default AdminLogin
