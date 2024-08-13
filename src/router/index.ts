import FAQ from '@/page/FAQ'
import Home from '@/page/Home'
import NoRecord from '@/page/NoRecord'
import NotFoundPage from '@/page/NotFoundPage'
import Admin from '@/page/admin'
import Detail from '@/page/detail'
import Summary from '@/page/summary'
import RSVPCancel from '@/page/RSVP/Cancellation'
import RSVPConfirm from '@/page/RSVP/Confirmation'
import Login from '@/page/login'
import Bookmark from '@/page/bookmark'
import NoBookmarkRecord from '@/page/NoBookmarkRecord'
import Archives from '@/page/archives'
import Museum from '@/page/museum'
import Library from '@/page/library'

import NoSession from '@/page/NoSession'
import GenericErrorPage from '@/page/GenericErrorPage'
import Fields from '@/page/admin/Fields'
import AdminHome from '@/page/admin/Home'
import AdminRSVP from '@/page/admin/RSVP'
import AdminMessage from '@/page/admin/Message'
import AdminStyles from '@/page/admin/Styles'

export type TRoute = Record<string, () => React.ReactNode>

const ADMIN_ROUTES: TRoute = {
	admin: Admin,
	'admin-fields': Fields,
	'admin-home': AdminHome,
	'admin-rsvp': AdminRSVP,
	'admin-message': AdminMessage,
	'admin-styles': AdminStyles,
}

export const ROUTES: TRoute = {
	home: Home,
	summary: Summary,
	detail: Detail,
	faq: FAQ,
	admin: Admin,
	login: Login,
	archives: Archives,
	library: Library,
	museum: Museum,
	'rsvp-cancel': RSVPCancel,
	'rsvp-confirm': RSVPConfirm,
	'no-record': NoRecord,
	'no-bk-record': NoBookmarkRecord,
	'no-bookmark': NoBookmarkRecord,
	'no-session': NoSession,
	error: GenericErrorPage,
	bookmark: Bookmark,
	...ADMIN_ROUTES,
}

export const getComponentFromKey = (key: string | undefined): (() => React.ReactNode) => {
	if (!key) return NotFoundPage
	if (key in ROUTES) {
		return ROUTES[key]
	}
	return NotFoundPage
}
