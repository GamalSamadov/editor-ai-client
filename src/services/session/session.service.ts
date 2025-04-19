import { axiosClassic } from "@/api/axios"
import { IEvent } from "@/services/event/event.types"
import { ISession } from "./session.types"
import { toast } from "sonner"

class SessionService {
  async getAll() {
    const response = await axiosClassic.get<ISession[]>("/sessions")
    return response.data
  }

  async delete(id: string) {
    try {
      return axiosClassic.delete<ISession>(`/sessions/${id}`)
    } catch {
      toast.error("Xatoli yuz berdi. Iltimos qayta urinib ko'ring.")
    }
  }
}

class TranscriptionSessionService {
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

export const transcriptionSessionService = new TranscriptionSessionService()
export const editSessionService = new EditSessionService()
export const sessionService = new SessionService()
