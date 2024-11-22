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
import BookmarkProfile from '@/page/BookmarkProfile'
import NoBookmarkRecord from '@/page/NoBookmarkRecord'
import Museum from '@/page/Museum'
import Archives from '@/page/Archives'
import Library from '@/page/Library'
import NoSession from '@/page/NoSession'
import GenericErrorPage from '@/page/GenericErrorPage'
import Fields from '@/page/admin/Fields'
import AdminHome from '@/page/admin/Home'
import AdminRSVP from '@/page/admin/RSVP'
import AdminMessage from '@/page/admin/Message'
import AdminStyles from '@/page/admin/Styles'
import PatronProfile from '@/page/PatronProfile'
import PatronInfo from '@/page/PatronInfo'
import Orders from '@/page/Orders'
import Copyright from '@/page/Copyright'
import Reproductions from '@/page/Reproductions'
import Enquiry from '@/page/Enquiry'
import Bookmark from '@/page/bookmark'
import Crowdsource from '@/page/Crowdsource'
import Calendar from '@/page/Calendar'
import AdminCollections from '@/page/admin/Collections'
import AdminDescription from '@/page/admin/Description'
import AdminSettings from '@/page/admin/Settings'
import Register from '@/page/login/Register'
import ResetPin from '@/page/login/ResetPin'
import ForgotPin from '@/page/login/ForgotPin'
import AdminLogin from '@/page/admin/Login'

export type TRoute = Record<string, (props?: any) => JSX.Element>

const ADMIN_ROUTES: TRoute = {
	admin: Admin,
	'admin-login': AdminLogin,
	'admin-fields': Fields,
	'admin-home': AdminHome,
	'admin-biblio': AdminHome,
	'admin-description': AdminDescription,
	'admin-collections': AdminCollections,
	'admin-rsvp': AdminRSVP,
	'admin-message': AdminMessage,
	'admin-styles': AdminStyles,
	'admin-settings': AdminSettings,
}

export const ROUTES: TRoute = {
	home: Home,
	summary: Summary,
	detail: Detail,
	faq: FAQ,
	admin: Admin,
	login: Login,
	register: Register,
	archives: Archives,
	library: Library,
	museum: Museum,
	patronprofile: PatronProfile,
	patroninfo: PatronInfo,
	orders: Orders,
	copyright: Copyright,
	reproductions: Reproductions,
	enquiry: Enquiry,
	bookmarkprofile: BookmarkProfile,
	crowdsource: Crowdsource,
	calendar: Calendar,
	'forgot-pin': ForgotPin,
	'reset-pin': ResetPin,
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
