import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useConstants from '@/hooks/useConstants'
import { getHomeSessionID } from '@/lib/utils'
import axios from 'axios'
import { useState } from 'react'



const Login = () => {
	const { config } = useConstants()
	const [accountNumber, setAccountNumber] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)


	const handleSubmit = async (event: any) => {
		event.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const response = await axios.post(
				'/scripts/mwimain.dll?patronlogin&application=UNION_VIEW&language=144',
				{ PATRON_ID: accountNumber, PATRON_PID: password },
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded', // Change to match your backend requirements
					},
				}
			)
			// login.html ==> static page(middleman) ==> ?SEARCH Report
			switch (response.status) {
				case 200:
					// console.log('Login successful', response.data);
					console.log(response)
					window.location.href =
						getHomeSessionID() +
						'?SEARCH&DATABASE=PATRON&REPORT=WEB_PATRON_PROFILE&EXP=patron_id+~3D+global(m2l_patron_id)'
					break
			}
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<section className="bg-white">
			<div className="lg:grid lg:min-h-screen lg:grid-cols-12">
				<aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
					<img
						alt=""
						src="https://images.unsplash.com/photo-1537202108838-e7072bad1927?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						className="absolute inset-0 h-full w-full object-cover"
					/>
				</aside>

				<main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
					<div className="w-full">
						<div className={'flex  items-center'}>
							<div>
								<a className="block text-teal-600" href="/">
									<span className="sr-only ">Home</span>
									<img className="h-14" src={config.logo} alt="logo" />
								</a>
							</div>
							<h1 className="ml-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
								Account Login
							</h1>
						</div>

						{/* Display error message if any */}
						{error && <p className="mt-4 text-red-500">{error}</p>}

						<form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
							<div className="col-span-6">
								<label
									htmlFor="Email"
									className="block text-sm font-medium text-gray-700">
									Account Number
								</label>
								<Input
									type="text"
									id="Email"
									name="PATRON_ID"
									value={accountNumber}
									onChange={(e) => setAccountNumber(e.target.value)}
								/>
							</div>

							<div className="col-span-6 sm:col-span-6">
								<label
									htmlFor="Password"
									className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<Input
									type="password"
									id="Password"
									name="PATRON"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="col-span-6 sm:flex sm:items-center sm:gap-4">
								<Button
									className="bg-opac-darkblue"
									type="submit"
									variant="default"
									disabled={loading}>
									{loading ? 'Logging in...' : 'Login'}
								</Button>
							</div>
						</form>
						<div className={'flex mt-1'}>
							<div>I don't have a login.</div>
							<a
								href={`${config.auth.register_url}`}
								className={'border-b-2 border-b-black ml-[10px] h-[22px]'}>
								Create an Account
							</a>
						</div>
					</div>
				</main>
			</div>
		</section>
	)
}

export default Login
