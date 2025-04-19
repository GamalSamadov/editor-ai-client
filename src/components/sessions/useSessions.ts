import { sessionService } from "@/services/session/session.service"
import { useQuery } from "@tanstack/react-query"

export const useSessions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => sessionService.getAll(),
  })

  return { data, isLoading }
}
