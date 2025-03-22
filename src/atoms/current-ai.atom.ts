import { atomWithStorage } from "jotai/utils"

export enum ECurrentAI {
  EDITOR = "edit",
  TRANSCRIBE = "transcribe",
}

export const currentAiAtom = atomWithStorage<ECurrentAI>(
  "current_ai",
  ECurrentAI.TRANSCRIBE
)
