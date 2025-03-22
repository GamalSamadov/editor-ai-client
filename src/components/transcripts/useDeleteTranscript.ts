import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"

import { PROTECTED_PAGES } from "@/config/pages/protected.config"
import { transcriptService } from "@/services/transcript/transcript.service"

export const useDeleteTranscript = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isDeleting, startDeleting] = useTransition()

  const deleteTranscript = (id: string) => {
    startDeleting(async () => {
      await transcriptService.delete(id)
      await queryClient.invalidateQueries({ queryKey: ["transcripts"] })
      router.push(PROTECTED_PAGES.TRANSCRIBE)
      toast.success("Amaliyot o'chirildi.")
    })
  }

  return { deleteTranscript, isDeleting }
}
