import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { cors } from 'hono/cors'
import fs from 'node:fs'
import { resolve } from 'node:path'
const app = new Hono()
app.use(prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))
app.use('/*', cors())
app.get('/', (c) => {
	return c.text('Server is currently running')
})

const base = 'C:/Mike/create_opac/src/'
function setFileContent(fp: string, content: string) {
	try {
		if (fs.existsSync(fp)) {
			fs.unlinkSync(fp)
		}
		fs.writeFileSync(fp, content)
	} catch (error) {
		console.log(error)
	}
}

app.post('/update', async (c) => {
	const body: { path: string; content: string } = await c.req.json()
	try {
		const { path, content } = body
		setFileContent(resolve(base, path), content)
		return c.json({
			message: 'success',
		})
	} catch (error) {
		return c.json({
			message: 'failed',
		})
	}
})

const port = 3030

serve({
	fetch: app.fetch,
	port,
})
