import * as Tooltip from '@radix-ui/react-tooltip'
import { TAG_NAME } from './Constants' 

interface ButtonTooltipProps {
	children: React.ReactNode
	item: Array<{ [key: string]: string }> 
}

const ButtonTooltip: React.FC<ButtonTooltipProps> = ({ children, item }) => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content side="top" align="center" sideOffset={5} className="hidden z-50 md:block max-w-[200px] max-h-[300px] overflow-y-hidden p-2 rounded bg-primary text-white text-start custom-scrollbar">
						{item?.map((elm, key) => <div key={key}>&#x2022;{elm[TAG_NAME]}</div>)}
						<Tooltip.Arrow className={'z-50 fill-primary'} width={5} height={5}/>
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}

export default ButtonTooltip
