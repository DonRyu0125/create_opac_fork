import { Button } from '@/components/ui/button'
import Layout from '../components/layouts'
import React, { useEffect, useState } from 'react'
import { FUNC_LOC_P_GRP, TAG_FUNC_DTE_GRP, TAG_FUNC_LOC_GRP } from '@/components/common/event-calendar/EventCalendar'

// let xmlFormDelete = `<?xml version="1.0" encoding="UTF-8"?>
// <RECORD>
//   <${TAG_FUNC_LOC_GRP} occ="${patron.occ1}" op="chg">
//     <${TAG_FUNC_DTE_GRP} occ="${patron.occ2}" op="chg">
//       <${FUNC_LOC_P_GRP} op="delete" search="${patron.ID}">
//       </${FUNC_LOC_P_GRP}>
//     </${TAG_FUNC_DTE_GRP}>
//   </${TAG_FUNC_LOC_GRP}>
// </RECORD>`

const RSVP = () => {
	const [registerd, setRegistered] = useState(false)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const queryParamsObject = {}
		params.forEach((value, key) => {
			queryParamsObject[key] = value
		})
		console.log('queryParamsObject', queryParamsObject)
	}, [])

	return (
		<Layout>
			<div className="flex h-screen flex-col bg-white">
				<img
					src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
					alt=""
					className="h-64 w-full object-cover"
				/>
				<div className="flex flex-1 items-center justify-center">
					<div className="mx-auto max-w-xl px-4 py-8 text-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							This will cancel your registration for
						</h1>

						<p className="mt-4 text-gray-500">
							Try searching again, or return home to start from the beginning.
						</p>

						<Button className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
							Unregister
						</Button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default RSVP
