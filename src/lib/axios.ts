import client from 'axios'

export const axios = client.create({
	baseURL: 'http://localhost:3030',
})
