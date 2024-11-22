import { encodeString } from './encoder'

export const OPAC_ADMIN_USERNAME = 'OPAC_ADMIN'
const generalParams: TdrParams = {
	username: '|2s|2w|6yx|0y|3|5|4u|6u|5|B',
	userpassword: '|Fs|Bx|Kv|7x|4z|8|3|1|7|0|5x|7u|Bt|Eu|G|F',
	tdr_api: 'https://titanapi.minisisinc.com',
	tdr_ui: 'https://titan.minisisinc.com',
	login_endpoint: '/token',
	search_endpoint: '/#/discover',
	bookmark_endpoint: '/api/Discover/BookmarkLinks',
	delete_bookmark_ep: '/api/Discover/Bookmarks',
}
type TdrParams = {
	tdr_api: string
	tdr_ui: string
	login_endpoint: string
	search_endpoint: string
	username: string
	bookmark_endpoint: string
	delete_bookmark_ep: string
	userpassword: string
}

export function generateTDRIframeURL(userName = OPAC_ADMIN_USERNAME): string {
	// Get current time in seconds
	const today = new Date()
	const year = today.getFullYear().toString()
	const month = (today.getMonth() + 1).toString().padStart(2, '0')
	const day = today.getDate().toString().padStart(2, '0')
	const hour = today.getHours().toString().padStart(2, '0')
	const minute = today.getMinutes().toString().padStart(2, '0')
	const second = today.getSeconds().toString().padStart(2, '0')

	// Generate bookmark ID
	const bookmarkId = `${userName}_${year}${month}${day}_${hour}${minute}${second}`

	// Encode URLs
	const loginUrl = encodeString(`${generalParams.tdr_api}${generalParams.login_endpoint}`)
	const searchUrl = encodeString(`${generalParams.tdr_ui}${generalParams.search_endpoint}`)

	// Generate discovery URL
	const discoveryUrl =
		`${generalParams.tdr_ui}/m2a-search.html` +
		`?US=${generalParams.username}` +
		`&PW=${generalParams.userpassword}` +
		`&LO=${loginUrl}` +
		`&SE=${searchUrl}` +
		`&BI=${bookmarkId}` +
		generalParams.search_endpoint +
		`/${bookmarkId}`

	return discoveryUrl
}
