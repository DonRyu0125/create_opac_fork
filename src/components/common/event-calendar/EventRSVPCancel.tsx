import React from 'react'
import { BookX } from 'lucide-react'
import useConstants from '@/hooks/useConstants'
const EventRSVPCancel = ({ reason }: { reason: string }) => {
    const message = useConstants().message
	return (
		<div
			className={
				'absolute w-full h-full max-w-[700px] max-h-[400px] z-40 flex justify-center items-center p-3 text-white'
			}>
			<div
				className={
					'bg-red-900 w-[300px] h-[200px] rounded flex justify-center items-center text-center'
				}>
				<div className={'text-center p-1'}>
					<div className={'flex justify-center mb-2'}>
						<BookX /> {message.eventCancel}
					</div>
					<div className={'text-center'}> {reason}</div>
				</div>
			</div>
		</div>
	)
}

export default EventRSVPCancel
