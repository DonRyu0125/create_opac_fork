import client from 'axios'

export const axios = client.create({
	baseURL: 'http://localhost:3030',
})

console.log(process.env.REACT_APP_API_ENDPOINT)
