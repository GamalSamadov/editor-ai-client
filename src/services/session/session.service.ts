import { axiosClassic } from "@/api/axios"
import { IEvent } from "@/services/event/event.types"

class SessionService {
  public async startSession(url: string | null) {
    const { data } = await axiosClassic.post<{ sessionId: string }>(
      `/sessions/start-transcribe`,
      {
        url,
      }
    )

    return data.sessionId
  }

  public async getAllSessions(sessionId: string | null) {
    const { data } = await axiosClassic.get<IEvent[]>(
      `/events/${sessionId}/find-all`
    )

    return data
  }
}

class EditSessionService {
  public async startSession(text: string, title: string) {
    const requestBody = {
      text,
      title,
    }

    try {
      const { data } = await axiosClassic.post<{ sessionId: string }>(
        `/sessions/start-edit`,
        requestBody
      )

      return data.sessionId
    } catch (error) {
      console.error("Error starting session:", error)
      throw new Error("Failed to start session")
    }
  }

  public async getAllSessions(sessionId: string | null) {
    const { data } = await axiosClassic.get<IEvent[]>(
      `/edit-events/${sessionId}/find-all`
    )

    return data
  }
}

export const sessionService = new SessionService()
export const editSessionService = new EditSessionService()
