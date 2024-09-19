import { FC, ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { TAG_NAME } from './Constants'
import { useMediaQuery } from 'react-responsive'

const EventButtonTooltip: React.FC<{ children: React.ReactNode; item: any }> = ({
	children,
	item,
}) => {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
	return (
		<>
			{isMobile ? (
				children
			) : (
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
						<Tooltip.Portal>
							<Tooltip.Content
								className="w-[200px] max-h-[300px] overflow-y-hidden p-2 rounded bg-primary text-white text-start custom-scrollbar"
								sideOffset={5}>
								{item.list.map((elm: any, key: number) => {
									return <div key={key}>&#x2022;{elm[TAG_NAME]}</div>
								})}
							</Tooltip.Content>
						</Tooltip.Portal>
					</Tooltip.Root>
				</Tooltip.Provider>
			)}
		</>
	)
}

export default EventButtonTooltip
