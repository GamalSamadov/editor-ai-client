import { redirect } from 'next/navigation'
import { getServerAuth } from './get-server-auth'
import { PUBLIC_PAGES } from '@/config/pages/public.config'

export const protectPage = async () => {
	const user = await getServerAuth()
	if (!user) {
		return redirect(PUBLIC_PAGES.AUTH)
	}
}
