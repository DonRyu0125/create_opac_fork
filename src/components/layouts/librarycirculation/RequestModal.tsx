import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useConstants from '@/hooks/useConstants'
import { getSessionID } from '@/lib/utils'
import axios from 'axios'

const RequestModal = ({ selectedId, selectOption, sisn }: { selectedId: string[]; selectOption: string; sisn: string }) => {
	const { message } = useConstants()

	const onSubmit = async () => {

		const data = {
			start_susp_date: '',
			stop_susp_date: '',
			PICKUP_LOCATION: '',
			CLEAR_SUSPENSION: selectOption === 'CLEAR' ? 'X' : '',
			...selectedId.reduce(
				(acc, id) => {
					if (selectOption === 'DELETE') {
						acc[id] = 'DELETE'
					} else {
						acc[id] = 'CHANGE'
					}
					return acc
				},
				{} as Record<string, string>
			),
		}

		const params = new URLSearchParams(data).toString()
		return await axios.post(`${getSessionID()}/${sisn}?MANIPITEM&REPORT=WEB_LIBRARY_CIRC_DASHBOARD`, params, {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		}).then(() => {
			window.location.reload()
		})
	}
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button disabled={selectedId.length > 0 ? false : true}>{message.submit}</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/40" />
				<Dialog.Content className="fixed left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
					<div className="flex justify-between items-center mb-4">
						<Dialog.Title className="text-lg font-bold">Modal Title</Dialog.Title>
						<Dialog.Close>
							<X className="w-5 h-5" />
						</Dialog.Close>
					</div>

					<div className="mb-6">This is a simple modal using Radix UI's Dialog.</div>

					<div className="flex justify-end gap-2">
						<Dialog.Close className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Cancel</Dialog.Close>
						<Dialog.Close asChild>
							<button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={onSubmit}>
								Confirm
							</button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default RequestModal
