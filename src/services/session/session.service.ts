import { axiosClassic } from '@/api/axios'
import { Event } from '@/services/event/event.types'

class SessionService {
	public async startSession() {
		const { data } = await axiosClassic.get<{ sessionId: string }>(
			`/sessions/start`
		)

		return data.sessionId
	}

	public async getAllSessions(sessionId: string | null) {
		const { data } = await axiosClassic.get<Event[]>(
			`/events/${sessionId}/find-all`
		)

		return data
	}
}

export const sessionService = new SessionService()
