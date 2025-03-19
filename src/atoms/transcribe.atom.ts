import { atom } from 'jotai'
import { Event } from '@/services/event/event.types'

export const eventAtom = atom<Event | null>(null)
export const sessionIdAtom = atom<string | null>(null)
export const transcribeUrlAtom = atom<string | null>(null)
