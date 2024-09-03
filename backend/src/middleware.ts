import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import { Hono } from 'hono'

// Apply middleware to the Hono app
export function applyMiddleware(app: Hono) {
	// Apply prettyJSON middleware
	app.use(prettyJSON())

	// Apply CORS middleware
	app.use('/*', cors())

	// 404 Handler
	app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))
}
