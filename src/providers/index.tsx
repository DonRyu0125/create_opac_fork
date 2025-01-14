import React from 'react'
import ErrorBoundary from './ErrorBoundary'
import { ThemeProvider } from './Theme'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { DisplayModeProvider } from './DisplayModeProvider'
import { EasyloadAuthProvider } from './EasyloadAuthProvider'

type Props = {
	children?: React.ReactNode
}

const Provider = ({ children }: Props) => {
	return (
		<ErrorBoundary>
			<EasyloadAuthProvider>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<DisplayModeProvider>
						<TooltipProvider>{children}</TooltipProvider>
					</DisplayModeProvider>
				</ThemeProvider>
			</EasyloadAuthProvider>
		</ErrorBoundary>
	)
}

export default Provider
