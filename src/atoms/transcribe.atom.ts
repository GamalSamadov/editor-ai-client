import { atom } from 'jotai'
import { IEvent } from '@/services/event/event.types'

export const eventAtom = atom<IEvent | null>(null)
export const sessionIdAtom = atom<string | null>(null)
export const transcribeUrlAtom = atom<string | null>(null)
