import { sessionService } from '@/services/session/session.service'
import { ITranscribeFormData } from '@/types/types'
import { useAtom, useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { PROTECTED_PAGES } from '@/config/pages/protected.config'
import {
	eventAtom,
	sessionIdAtom,
	transcribeUrlAtom,
} from '@/atoms/transcribe.atom'
import { useTransition } from 'react'

export const useStartTranscribe = () => {
	const { register, handleSubmit, reset, formState } =
		useForm<ITranscribeFormData>({ mode: 'onSubmit' })

	const router = useRouter()

	const setEvent = useSetAtom(eventAtom)
	const setSessionId = useSetAtom(sessionIdAtom)
	const [url, setUrl] = useAtom(transcribeUrlAtom)

	const [isLoadingTransition, startIsLoadingTransition] = useTransition()

	const startSession = () => {
		startIsLoadingTransition(async () => {
			reset()
			const newSessionId = await sessionService.startSession()
			setSessionId(newSessionId)
			localStorage.setItem('sessionId', newSessionId)
			setEvent(null)
			router.push(`${PROTECTED_PAGES.TRANSCRIBE}/${newSessionId}?url=${url}`)
		})
	}

	return {
		startSession,
		register,
		handleSubmit,
		formState,
		isLoading: isLoadingTransition,
		setUrl,
	}
}
