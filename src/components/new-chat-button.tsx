import { PenBox } from "lucide-react"
import { useAtomValue } from "jotai"
import { currentAiAtom, ECurrentAI } from "@/atoms/current-ai.atom"
import Link from "next/link"

export const NewChatButton = () => {
  const currentAi = useAtomValue(currentAiAtom)
  return (
    <Link
      href={
        currentAi === ECurrentAI.TRANSCRIBE
          ? "/transcribe"
          : currentAi === ECurrentAI.EDITOR
            ? "/edit"
            : "/"
      }
      className="cursor-pointer"
    >
      <PenBox size={21} />
    </Link>
  )
}
