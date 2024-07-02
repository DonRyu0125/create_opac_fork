export type PatronInfo = {
	TAG_FUNC_P_ATTND: string
	TAG_FUNC_P_FIRST: string
	TAG_FUNC_P_LAST: string
	TAG_FUNC_P_EMAIL: string
	TAG_NAME: string
	TAG_FUNC_START_T: string
	TAG_FUNC_END_T: string
	TAG_FUNC_ROOM: string
	TAG_FUNC_DATE: string
	TAG_FUNC_LOC: string
	SISN: string
	TAG_FUNC_P_ID: string
	TAG_FUNC_P_T: string
	BRANCH_ADDRESS: string
	occ1: string
	occ2: string
	TAG_FUNC_P_PAID: any
}

export interface StatusType {
	Invalid: string
	Success: string
	Cancel: string
	OutDate: string
	InList: string // Already registered
	Full: string // Fully registered
	Expired: string
    Confirm:string
}

export const STATUS_TYPE: StatusType = {
	Invalid: 'Invalid',
	Success: 'Success',
	Confirm: 'Confirm',
	Cancel: 'Cancel',
	OutDate: 'OutDate',
	InList: 'InList',
	Full: 'Full',
	Expired: 'Expired',
}
