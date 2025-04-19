import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

import { PROTECTED_PAGES } from "@/config/pages/protected.config"
import { sessionService } from "@/services/session/session.service"
import { ESessionType } from "@/services/session/session.types"

export const useDeleteSession = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isDeleting, startDeleting] = useTransition()

  const deleteSession = (id: string) => {
    startDeleting(async () => {
      const response = await sessionService.delete(id)
      const session = response?.data
      await queryClient.invalidateQueries({ queryKey: ["sessions"] })

      if (session?.type === ESessionType.TRANSCRIBE) {
        router.push(PROTECTED_PAGES.TRANSCRIBE)
      } else if (session?.type === ESessionType.EDIT) {
        router.push(PROTECTED_PAGES.EDIT)
      }

      toast.success("Amaliyot o'chirildi.")
    })
  }

  return { deleteSession, isDeleting }
}
