import { useState, useEffect } from 'react'

function useDisplayMode(defaultMode = 'grid') {
	const [displayMode, setDisplayMode] = useState(() => {
		// Retrieve the display mode from localStorage or use the default value
		return localStorage.getItem('displayMode') || defaultMode
	})

	useEffect(() => {
		// Store the display mode in localStorage whenever it changes
		localStorage.setItem('displayMode', displayMode)
	}, [displayMode])

	return [displayMode, setDisplayMode]
}

export default useDisplayMode
