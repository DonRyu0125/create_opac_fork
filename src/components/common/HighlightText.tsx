export const HighlightText = ({ text, highlights }: { text: string; highlights: string[] }) => {
	if (!highlights.length) return <p className="text-foreground">{text}</p>

	// Create a regex pattern from the highlight words
	const regex = new RegExp(`(${highlights.join('|')})`, 'gi')

	// Split the text using the regex
	const parts = text.split(regex)

	return (
		<p className="text-foreground">
			{parts.map((part, index) =>
				highlights.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
					<span key={index} className="bg-foreground text-background px-1 rounded">
						{part}
					</span>
				) : (
					part
				)
			)}
		</p>
	)
}
