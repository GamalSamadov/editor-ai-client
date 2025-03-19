import { atomWithStorage } from 'jotai/utils'

export enum ECurrentAI {
	EDITOR = 'editor',
	TRANSCRIBE = 'transcribe',
}

export const currentAiAtom = atomWithStorage<ECurrentAI>(
	'current_ai',
	ECurrentAI.TRANSCRIBE
)
