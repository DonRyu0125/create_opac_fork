import FAQ from '@/page/FAQ'
import Home from '@/page/Home'
import NotFoundPage from '@/page/NotFoundPage'
import Detail from '@/page/detail'
import Summary from '@/page/summary'
import RSVP_CANCEL from '@/page/RSVPCancelLandingPage'
import RSVP_CONFIRM from '@/page/RSVPConfirmLandingPage'

export type TRoute = Record<string, () => React.ReactNode>

export const ROUTES: TRoute = {
	home: Home,
	summary: Summary,
	detail: Detail,
	faq: FAQ,
	rsvp_cancel: RSVP_CANCEL,
	rsvp_confirm: RSVP_CONFIRM
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
