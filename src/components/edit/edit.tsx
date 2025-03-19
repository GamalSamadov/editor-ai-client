'use client'

import { currentAiAtom, ECurrentAI } from '@/atoms/current-ai.atom'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'

export const Edit = () => {
	const setCurrentAi = useSetAtom(currentAiAtom)

	useEffect(() => {
		setCurrentAi(ECurrentAI.EDITOR)
	}, [])

	return <div>Edit</div>
}
