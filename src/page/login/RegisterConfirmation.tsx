import Layout from '@/components/layouts'
import { decodeObj } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import LandingPageMessage from '../RSVP/LandingPageMessage'
import Spinner from '@/components/common/event-calendar/Spinner'

export const STATUS_TYPE = {
	InList: 'InList', // Already registered
	Expired: 'Expired', // Link expired
	Verified: 'Verified',
	Full: 'Full', // Fully registered
} as const

const ACCOUNT_MAKE_LINK_EXP_HOURS = 24

const RegisterConfirmation = () => {
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')

	useEffect(() => {
		checkParms()
	}, [])

	const checkParms = async () => {
		const params = new URLSearchParams(window.location.search)
		let obj: any
		params.forEach((value: string, key) => {
			obj = decodeObj(value)
		})

		if (!obj) {
			setLoading(false)
			return
		}
		let jsonObj = JSON.parse(obj)
		if (isExpired(jsonObj.TAG_FUNC_P_T)) {
			setStatus(STATUS_TYPE.Expired)
			return
		}

		// return await isRecordValidate(jsonObj).then((res) => {
		// 	setLoading(false)
		// 	if (res.status) {
		// 		setPatronInfo({ ...jsonObj, [TAG_FUNC_LOC_DEC]: res.TAG_FUNC_LOC_DEC })
		// 		setStatus(STATUS_TYPE.Confirm)
		// 		return
		// 	}
		// 	return
		// })
	}

	const isExpired = (registered_time: string) => {
		const givenTime = new Date(registered_time)
		const currentTime = new Date()
		const milliseconds = ACCOUNT_MAKE_LINK_EXP_HOURS * 60 * 60 * 1000
		const timeDifference = currentTime.getTime() - givenTime.getTime()
		return timeDifference > milliseconds
	}

	const showRegStatus = () => {
		switch (status) {
			case STATUS_TYPE.InList:
				<LandingPageMessage
					{...{
						title: "L'événement a déjà eu lieu",
						subtitle: 'Veuillez vérifier notre site web pour les événements futurs.',
						showButton: true,
						buttonText: 'Aller au site web',
						buttonLink: '/',
					}}
				/>
			default:
				return <LandingPageMessage {...{
					title: "",
					subtitle: 'Veuillez vérifier notre site web pour les événements futurs.',
					showButton: true,
					buttonText: 'Aller au site web',
					buttonLink: '/',
				}} />
		}
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

export default RegisterConfirmation
