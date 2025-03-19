import { atomWithStorage } from 'jotai/utils'

export const sheetAtom = atomWithStorage<boolean>('is_sheet_open', false)
