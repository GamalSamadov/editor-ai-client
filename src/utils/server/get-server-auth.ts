'use server'

import { EnumTokens } from '@/services/auth/auth.service'
import { ITokenInside } from '@/services/auth/auth.types'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import {
	transformUserToState,
	TUserDataState,
} from '../transform-user-to-state'

export async function getServerAuth(): Promise<TUserDataState | null> {
	const JWT_SECRET = process.env.JWT_SECRET
	const nextCookies = await cookies()

	const accessToken = nextCookies.get(EnumTokens.ACCESS_TOKEN)?.value

	if (!accessToken) return null

	try {
		const { payload }: { payload: ITokenInside } = await jwtVerify(
			accessToken,
			new TextEncoder().encode(`${JWT_SECRET}`)
		)

		if (!payload) return null

		return transformUserToState(payload)
	} catch {
		return null
	}
}
