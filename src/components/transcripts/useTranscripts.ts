import { transcriptService } from "@/services/transcript/transcript.service"
import { useQuery } from "@tanstack/react-query"

export const useTranscripts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["transcripts"],
    queryFn: () => transcriptService.getAll(),
  })

  return { data, isLoading }
}
