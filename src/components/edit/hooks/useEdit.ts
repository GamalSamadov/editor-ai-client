import { useEffect, useState } from "react"
import { API_URL } from "@/utils/constants"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { IEvent } from "@/services/event/event.types"

export const useEdit = () => {
  const { sessionId } = useParams()

  const [events, setEvents] = useState<IEvent[]>([])
  const [completed, setCompleted] = useState(false)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!sessionId) return

    const evtSource = new EventSource(`${API_URL}/edit-events/${sessionId}`)

    evtSource.onmessage = (e) => {
      queryClient.invalidateQueries({ queryKey: ["edits"] })
      const data = JSON.parse(e.data)
      setEvents((prev) => [...prev, data])
      if (data.completed) {
        setCompleted(true)
      }
    }

    evtSource.onerror = (err) => {
      console.error("SSE error:", err)
      evtSource.close()
    }

    return () => {
      evtSource.close()
    }
  }, [sessionId, queryClient])

  return {
    events,
    completed,
  }
}
