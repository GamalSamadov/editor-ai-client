import { useAtom, useSetAtom } from "jotai"
import { useRouter } from "next/navigation"
import { useEffect, useTransition } from "react"
import { useForm } from "react-hook-form"

import { currentAiAtom, ECurrentAI } from "@/atoms/current-ai.atom"
import { eventAtom, transcribeUrlAtom } from "@/atoms/transcribe.atom"
import { PROTECTED_PAGES } from "@/config/pages/protected.config"
import { sessionService } from "@/services/session/session.service"
import { ITranscribeFormData } from "@/types/types"

export const useStartTranscribe = () => {
  const { register, handleSubmit, reset, formState, watch } =
    useForm<ITranscribeFormData>({ mode: "onSubmit" })

  const watchUrl = watch("url")

  const router = useRouter()

  const setCurrentAi = useSetAtom(currentAiAtom)
  const setEvent = useSetAtom(eventAtom)
  const [url, setUrl] = useAtom(transcribeUrlAtom)

  const [isLoadingTransition, startIsLoadingTransition] = useTransition()

  const onSubmit = () => {
    startIsLoadingTransition(async () => {
      reset()
      const newSessionId = await sessionService.startSession(url)
      setEvent(null)
      router.push(`${PROTECTED_PAGES.TRANSCRIBE}/${newSessionId}`)
    })
  }

  useEffect(() => {
    setCurrentAi(ECurrentAI.TRANSCRIBE)
  }, [setCurrentAi])

  useEffect(() => {
    setUrl(watchUrl)
  }, [watchUrl, setUrl])

  return {
    onSubmit,
    register,
    handleSubmit,
    formState,
    isLoading: isLoadingTransition,
    setUrl,
  }
}
