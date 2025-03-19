import { currentAiAtom, ECurrentAI } from '@/atoms/current-ai.atom'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Event } from '@/services/event/event.types'
import { sessionService } from '@/services/session/session.service'
import { API_URL } from '@/utils/constants'
import { eventAtom, sessionIdAtom } from '@/atoms/transcribe.atom'
import { useSearchParams } from 'next/navigation'

export const useTranscribe = () => {
	const [result, setResult] = useState<string | null>(null)

	const [event, setEvent] = useAtom(eventAtom)
	const [sessionId, setSessionId] = useAtom(sessionIdAtom)
	const setCurrentAi = useSetAtom(currentAiAtom)

	const searchParams = useSearchParams()
	const url = searchParams.get('url')

	useEffect(() => {
		setCurrentAi(ECurrentAI.TRANSCRIBE)
		if (typeof window !== 'undefined') {
			const storedSessionId = localStorage.getItem('sessionId')
			if (storedSessionId) setSessionId(storedSessionId)
		}
	}, [])

	useEffect(() => {
		if (!sessionId) return

		async function getEvents() {
			try {
				const data = await sessionService.getAllSessions(sessionId)
				if (data && data.length > 0) {
					setEvent(data[data.length - 1])
				}
			} catch (err) {
				console.error('Error fetching events:', err)
			}
		}
		getEvents()

		const evtSource = new EventSource(
			`${API_URL}/events/${sessionId}?url=${url}`
		)

		evtSource.onmessage = e => {
			const data = JSON.parse(e.data)

			if (data.completed) {
				setSessionId(null)
				localStorage.removeItem('sessionId')
				setResult('Session completed')
				evtSource.close()
			} else {
				const newMessage: Event = {
					content: data.event,
					createdAt: data.createdAt,
				}
				setEvent(newMessage)
			}
		}

		evtSource.onerror = err => {
			console.error('SSE error:', err)
			evtSource.close()
		}

		return () => {
			evtSource.close()
		}
	}, [sessionId])

	return { sessionId, event, result }
}
