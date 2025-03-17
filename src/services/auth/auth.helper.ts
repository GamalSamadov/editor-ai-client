import { TOKEN_EXPIRES } from '@/utils/constants'
import Cookies from 'js-cookie'

export const getAccessToken = () => {
	const accessToken = Cookies.get('accessToken')
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set('accessToken', accessToken, {
		domain: 'localhost',
		sameSite: 'Strict',
		expires: TOKEN_EXPIRES,
	})
}

export const removeFromStorage = () => {
	Cookies.remove('accessToken')
}
