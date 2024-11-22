// encode_string()
// Purpose: convert plain-text string to web-encoded string
export function encodeString(inputString: string): string {
	// Convert plain-text string to MINISIS encoded string
	const minisisEncodedString = minisisEncoding(inputString)

	// Convert MINISIS encoded string to web-encoded string
	const webString = webEncoding(minisisEncodedString)

	// Return web-encoded string
	return webString
}

// minisis_encoding()
// Purpose: encode plain-text to MINISIS encoded string
// Processing: Splits byte into two 4-bit values, adds sum value to 4-bit values, swaps values, and adds a check digit.
export function minisisEncoding(inputString: string): string {
	let mEncodedString = ''
	const tempArray: number[] = []
	const stringLength = inputString.length

	// Input string size must be less than or equal to 96 characters
	if (stringLength <= 96) {
		// Split byte to 2 4-bit values and then add sum value
		for (let ix = 0; ix < stringLength; ix++) {
			const charValue = inputString.charCodeAt(ix)
			const value2 = Math.floor(charValue / 16)
			const value1 = charValue % 16

			tempArray[ix * 2] = value1 + ix * 2 + 1 + 48 // 48 = ASCII code for '0'
			tempArray[ix * 2 + 1] = value2 + ix * 2 + 2 + 48
		}

		// Swap characters
		const limit = Math.floor(stringLength / 2)
		let lastLoc = stringLength * 2 - 2
		for (let ix = 0; ix < limit; ix++) {
			const temp = tempArray[ix * 2]
			tempArray[ix * 2] = tempArray[lastLoc]
			tempArray[lastLoc] = temp
			lastLoc -= 2
		}

		// Set check digit
		tempArray[stringLength * 2] = stringLength + 65 // 65 = ASCII code for 'A'

		// Convert byte array to string
		const totalLength = stringLength * 2 + 1
		for (let ix = 0; ix < totalLength; ix++) {
			mEncodedString += String.fromCharCode(tempArray[ix])
		}
	}

	return mEncodedString
}

// web_encoding()
// Purpose: encode text string to web-encoded string
// Processing: Maps 256-base character codes to one or more 62-base character codes
export function webEncoding(inputString: string): string {
	const base62Code = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	const multiplierChar = '|?@['
	const MAX_WEB_CHARS = base62Code.length
	let wEncodedString = ''

	for (let ix = 0; ix < inputString.length; ix++) {
		const charValue = inputString.charCodeAt(ix)
		let webCharString: string

		if (charValue < MAX_WEB_CHARS) {
			webCharString = base62Code[charValue]
		} else {
			const multiplier = Math.floor(charValue / MAX_WEB_CHARS) - 1
			webCharString = multiplierChar[multiplier] + base62Code[charValue % MAX_WEB_CHARS]
		}

		wEncodedString += webCharString
	}

	return wEncodedString
}
