import { currentAiAtom, ECurrentAI } from "@/atoms/current-ai.atom"
import { PROTECTED_PAGES } from "@/config/pages/protected.config"
import { authService } from "@/services/auth/auth.service"
import { IAuthFormData } from "@/types/types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useAtomValue } from "jotai"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export const useAuthForm = (isLogin?: boolean) => {
  const currentAi = useAtomValue(currentAiAtom)
  const { register, handleSubmit, reset, formState } = useForm<IAuthFormData>({
    mode: "onChange",
  })

  const router = useRouter()

  const [isLoginTransition, startIsLoginTransition] = useTransition()
  const [isRegisterTransition, startIsRegisterTransition] = useTransition()

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IAuthFormData) => authService.main("login", data),
    onSuccess() {
      startIsLoginTransition(() => {
        reset()
        if (currentAi === ECurrentAI.EDITOR) {
          router.push(PROTECTED_PAGES.EDIT)
        } else {
          router.push(PROTECTED_PAGES.TRANSCRIBE)
        }
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message)
        }
        if (error.response?.data.errors[0].msg) {
          toast.error(error.response?.data.errors[0].msg)
        }
        toast.error("Qandaydir xatolik yuz berdi.")
      }
    },
  })

  const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: IAuthFormData) => authService.main("register", data),
    onSuccess() {
      startIsRegisterTransition(() => {
        reset()
        if (currentAi === ECurrentAI.EDITOR) {
          router.push(PROTECTED_PAGES.TRANSCRIBE)
        } else {
          router.push(PROTECTED_PAGES.EDIT)
        }
      })
    },
    onError(error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message)
        }
        if (error.response?.data.errors[0].msg) {
          toast.error(error.response?.data.errors[0].msg)
        }
        toast.error("Qandaydir xatolik yuz berdi.")
      }
    },
  })

  const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
    if (isLogin) {
      mutateLogin(data)
    } else {
      mutateRegister(data)
    }
  }

  const isLoading =
    isLoginPending ||
    isRegisterPending ||
    isLoginTransition ||
    isRegisterTransition

  return {
    register,
    handleSubmit,
    onSubmit,
    isLoading,
    formState,
  }
}
