import { Hono } from 'hono'
import path, { resolve } from 'node:path'
import { applyMiddleware } from './middleware'
import { rebuildOPAC, setFileContent } from './utils'
// Create the Hono application
const app = new Hono()

// Middleware
applyMiddleware(app)

// Route for checking server status
app.get('/', (c) => {
	return c.text('Server is currently running')
})

// Route for updating files
app.post('/update', async (c) => {
	const base = resolve(path.dirname(path.dirname(__dirname)), 'src')

	if (!base) return c.json({ status: 'failed', message: 'No base directory' })
	const body: { path: string; content: string } = await c.req.json()

	try {
		const { path, content } = body
		setFileContent(resolve(base, path), content)
		const process = rebuildOPAC()

		console.log(resolve(base, path))

		console.log({ process })

		return c.json({ status: 'success', message: 'Your file has been updated successfully' })
	} catch (error) {
		console.error('Error updating file:', error)
		return c.json({ status: 'failed', message: 'Error updating file' })
	}
})

export { app }
