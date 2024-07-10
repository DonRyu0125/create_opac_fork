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
import AdvSearch from '@/page/AdvSearch'

export type TRoute = Record<string, () => React.ReactNode>

export const ROUTES: TRoute = {
	home: Home,
	summary: Summary,
	detail: Detail,
	faq: FAQ,
	admin: Admin,
	login: Login,
	bookmark: Bookmark,
	'rsvp-cancel': RSVPCancel,
	'rsvp-confirm': RSVPConfirm,
	'no-record': NoRecord,
	'no-bk-record': NoBookmarkRecord,
	'advanced-search':AdvSearch
}

/**
 * Return the Component for the corresponding key
 * @param key
 * @returns
 */
export const getComponentFromKey = (key: string | undefined): (() => React.ReactNode) => {
	if (!key) return NotFoundPage
	if (key in ROUTES) {
		return ROUTES[key]
	}
	return NotFoundPage
}

