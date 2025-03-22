import { useEffect, useState } from 'react'
import { API_URL } from '@/utils/constants'
import { useParams, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { IEvent } from '@/services/event/event.types'

export const useTranscribe = () => {
	const searchParams = useSearchParams()
	const url = searchParams.get('url')
	const { sessionId } = useParams()

	const [events, setEvents] = useState<IEvent[]>([])
	const [completed, setCompleted] = useState(false)

	const queryClient = useQueryClient()

	useEffect(() => {
		if (!url || !sessionId) return
		// Connect to SSE
		const evtSource = new EventSource(
			`${API_URL}/events/${sessionId}?url=${encodeURIComponent(url)}`
		)

		evtSource.onmessage = e => {
			queryClient.invalidateQueries({ queryKey: ['transcripts'] })
			const data = JSON.parse(e.data)
			setEvents(prev => [...prev, data])
			if (data.completed) {
				setCompleted(true)
			}
		}

		evtSource.onerror = err => {
			console.error('SSE error:', err)
			evtSource.close()
		}

		return () => {
			evtSource.close()
		}
	}, [url, sessionId, queryClient])

	return {
		events,
		completed,
		url,
	}
}
