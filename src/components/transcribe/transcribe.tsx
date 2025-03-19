'use client'

import { Loader2, WandSparkles } from 'lucide-react'
import { useTranscribe } from './useTranscribe'

export const Transcribe = () => {
	const { sessionId, event, result } = useTranscribe()
	return (
		<div className='p-4 w-full h-full flex items-center justify-center'>
			{sessionId && !result && (
				<div className='w-full h-150 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex justify-center items-center flex-col gap-4'>
					<div>
						<WandSparkles size={100} className='animate-pulse' />
					</div>

					<p className='flex gap-2 items-center justify-center text-center'>
						<span>{event?.content}</span>
						<Loader2 size={10} className='animate-spin' />
					</p>
				</div>
			)}

			{result && (
				<div className='w-full h-150 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex justify-center items-center flex-col gap-4'>
					<p>{result}</p>
				</div>
			)}
		</div>
	)
}
