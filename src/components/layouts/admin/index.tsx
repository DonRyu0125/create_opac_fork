import Link from '@/components/common/Link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	Search,
	Settings,
	ShoppingCart,
	Users2,
} from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

type AdminLayoutProps = {
	children?: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
			<Sidebar />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<Header />
			</div>

			<Footer />
		</div>
	)
}

export default AdminLayout
