import { FC, ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

const EventButtonTooltip: React.FC<{ children: React.ReactNode; item:any; }> = ({ children,item }) => {
	console.log('item', item)
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="bg-primary text-white" sideOffset={5}>
						Add to library
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}

export default EventButtonTooltip
