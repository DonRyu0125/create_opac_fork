import { encodeString } from './encoder'

type TdrParams = {
	tdr_api: string
	tdr_ui: string
	login_endpoint: string
	search_endpoint: string
	username: string
	userpassword: string
}

type GeneralParams = {
	tdr_parms: TdrParams
}

export function generateTDRIframeURL(userName: string, generalParams: GeneralParams): string {
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
	const loginUrl = encodeString(
		`${generalParams.tdr_parms.tdr_api}${generalParams.tdr_parms.login_endpoint}`
	)
	const searchUrl = encodeString(
		`${generalParams.tdr_parms.tdr_ui}${generalParams.tdr_parms.search_endpoint}`
	)

	// Generate discovery URL
	const discoveryUrl =
		`${generalParams.tdr_parms.tdr_ui}/m2a-search.html` +
		`?US=${generalParams.tdr_parms.username}` +
		`&PW=${generalParams.tdr_parms.userpassword}` +
		`&LO=${loginUrl}` +
		`&SE=${searchUrl}` +
		`&BI=${bookmarkId}` +
		generalParams.tdr_parms.search_endpoint +
		`/${bookmarkId}`

	return discoveryUrl
}
