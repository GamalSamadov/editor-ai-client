import { currentAiAtom, ECurrentAI } from '@/atoms/current-ai.atom'
import { useSetAtom } from 'jotai'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useStartEdit = () => {
	const { register, handleSubmit, formState } = useForm()

	const setCurrentAi = useSetAtom(currentAiAtom)

	const [fileText, setFileText] = useState('')

	const onSubmit = () => {
		// TODO:
		console.log('File text:', fileText)
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (!files || files.length === 0) return

		const file = files[0]
		const reader = new FileReader()

		reader.onload = loadEvent => {
			if (typeof loadEvent.target?.result === 'string') {
				setFileText(loadEvent.target.result)
			}
		}
		reader.readAsText(file)
	}

	useEffect(() => {
		setCurrentAi(ECurrentAI.EDITOR)
	}, [])

	return { register, handleSubmit, formState, onSubmit, handleFileChange }
}
