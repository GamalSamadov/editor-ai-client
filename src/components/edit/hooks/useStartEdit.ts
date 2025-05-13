import { currentAiAtom, ECurrentAI } from "@/atoms/current-ai.atom"
import { useSetAtom } from "jotai"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import mammoth from "mammoth"
import { editSessionService } from "@/services/session/session.service"
import { useRouter } from "next/navigation"
import { PROTECTED_PAGES } from "@/config/pages/protected.config"

interface IFormInput {
  file: FileList | null
  prompt: string
}

export const useStartEdit = () => {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    setValue,
    trigger,
    getValues,
    reset,
  } = useForm<IFormInput>({
    mode: "onChange",
  })

  const setCurrentAi = useSetAtom(currentAiAtom)
  const [fileText, setFileText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [fileError, setFileError] = useState<string | null>(null)

  const [isLoadingEdit, startIsLoadingEdit] = useTransition()
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!formState.isValid || formState.errors.file) {
      return
    }
    if (fileError) {
      if (!formState.errors.file) {
        setError("file", { type: "manual", message: fileError })
      }
      return
    }

    if (data.file && data.file.length > 0 && !fileText && !isLoading) {
      const msg = "Faylni o'qishda xatolik yoki fayl bo'sh."
      setFileError(msg)
      setError("file", { type: "manual", message: msg })
      return
    }

    startIsLoadingEdit(async () => {
      reset()
      const text = fileText

      console.log(text.length, "text.length")
      const title = "Matnni tahrirlash sessiyasi"
      const newSessionId = await editSessionService.startSession(text, title)
      router.push(`${PROTECTED_PAGES.EDIT}/${newSessionId}`)
    })
  }

  const handleFileChange = async (
    event:
      | ChangeEvent<HTMLInputElement>
      | { target: { files: FileList | null } }
  ) => {
    setFileText("")
    setFileError(null)
    clearErrors("file")
    setIsLoading(true)

    const files = event.target.files
    const isActualInputElement =
      (event as ChangeEvent<HTMLInputElement>).target instanceof
      HTMLInputElement
    const fileInput = isActualInputElement
      ? (event as ChangeEvent<HTMLInputElement>).target
      : null

    if (!files || files.length === 0) {
      setFileText("")
      setFileError(null)
      setIsLoading(false)
      return
    }

    const file = files[0]
    const reader = new FileReader()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    const handleError = (message: string, error?: any) => {
      setFileError(message)
      setError("file", { type: "manual", message })
      setFileText("")
      if (fileInput) {
        fileInput.value = ""
      }
      setValue("file", null, { shouldValidate: true, shouldDirty: true })
      setIsLoading(false)
      console.log("Hook: handleError finished. Set loading=false.")
    }

    reader.onerror = (error) => {
      handleError(`Faylni o'qishda tizim xatoligi: ${file.name}`, error)
    }

    try {
      if (file.name.endsWith(".txt") || file.type === "text/plain") {
        reader.onload = (loadEvent) => {
          setIsLoading(false)
          if (typeof loadEvent.target?.result === "string") {
            setFileText(loadEvent.target.result)
            setFileError(null)
            clearErrors("file")
          } else {
            handleError(`.txt faylini o'qish natijasi matn emas: ${file.name}`)
          }
        }
        reader.readAsText(file)
      } else if (
        file.name.endsWith(".docx") ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        reader.onload = async (loadEvent) => {
          if (loadEvent.target?.result instanceof ArrayBuffer) {
            try {
              const result = await mammoth.extractRawText({
                arrayBuffer: loadEvent.target.result,
              })

              setFileText(result.value || "")
              setFileError(null)
              clearErrors("file")
              setIsLoading(false)
            } catch (mammothError) {
              handleError(
                `.docx faylini qayta ishlashda xatolik: ${file.name}`,
                mammothError
              )
            }
          } else {
            handleError(
              `.docx faylini o'qishda kutilmagan natija turi: ${file.name}`
            )
          }
        }
        reader.readAsArrayBuffer(file)
      } else {
        const msg = `Qo'llab-quvvatlanmaydigan fayl turi: ${file.name}. Faqat .txt yoki .docx.`
        handleError(msg)
      }
    } catch (processingError) {
      handleError(
        "Faylni qayta ishlashni boshlashda kutilmagan xatolik",
        processingError
      )
    }
  }

  useEffect(() => {
    setCurrentAi(ECurrentAI.EDITOR)
  }, [setCurrentAi])

  return {
    register,
    handleSubmit,
    formState,
    setValue,
    trigger,
    clearErrors,
    setError,
    getValues,
    onSubmit,
    handleFileChange,
    isLoading,
    fileText,
    fileError,
    isLoadingEdit, // TODO: refactor isloading
  }
}
