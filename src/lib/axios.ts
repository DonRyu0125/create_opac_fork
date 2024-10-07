import client from 'axios'

export const axios = client.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
})
