import client from 'axios'

export const axios = client.create({
	baseURL: 'https://camsopac-dev.minisisinc.com:3030',
})
