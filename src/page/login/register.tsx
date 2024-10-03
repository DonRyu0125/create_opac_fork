import Spinner from '@/components/common/event-calendar/Spinner'
import Layout from '@/components/layouts'
import React, { useState } from 'react'

const Register = () => {
	const [loading, setLoading] = useState(false)

	const showRegStatus = () => {
		return <></>
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
				<div>{showRegStatus()}</div>
			)}
		</Layout>
	)
}

export default Register
