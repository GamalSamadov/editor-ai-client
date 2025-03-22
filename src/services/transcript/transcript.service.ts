import { axiosClassic } from '@/api/axios'
import { ITranscript } from './transcript.types'
import { toast } from 'sonner'

class TranscriptService {
	async getAll() {
		const response = await axiosClassic.get<ITranscript[]>('/transcripts')

		return response.data
	}

	async delete(id: string) {
		try {
			return axiosClassic.delete(`/transcripts/${id}`)
		} catch {
			toast.error("Xatoli yuz berdi. Iltimos qayta urinib ko'ring.")
		}
	}
}

export const transcriptService = new TranscriptService()
