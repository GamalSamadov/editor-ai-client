import { atomWithStorage } from "jotai/utils"

export enum ECurrentAI {
  EDITOR = "edit",
  TRANSCRIBE = "transcribe",
  CORRECTION = "correction",
}

export const currentAiAtom = atomWithStorage<ECurrentAI>(
  "current_ai",
  ECurrentAI.CORRECTION
)
