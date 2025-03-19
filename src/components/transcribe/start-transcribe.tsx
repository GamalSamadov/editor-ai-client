'use client'

import { ArrowUp, Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { useStartTranscribe } from './useStartTranscribe'
import { URL_PATTERN } from '@/utils/constants'
import { Button } from '../ui/button'

export const StartTranscribe = () => {
	const { startSession, register, handleSubmit, formState, isLoading, setUrl } =
		useStartTranscribe()

	const urlError = formState.errors.url?.message
	return (
		<div className='p-4 w-full h-full flex items-center justify-center'>
			<form onSubmit={handleSubmit(startSession)} autoComplete='on'>
				<div className='w-[90vw] lg:w-[50vw] flex items-center justify-center flex-col gap-6'>
					<h1 className='text-3xl font-bold'>JanobYozuvchi👨🏼‍💻</h1>
					<div className='w-full flex items-center justify-center gap-2'>
						<Input
							id='url'
							placeholder='Video manzilini kiriting...'
							{...register('url', {
								required: 'Bu yer majburiy',
								pattern: {
									value: URL_PATTERN,
									message: "Manzilni to'g'ri kiriting.",
								},
							})}
							onChange={e => {
								console.log(e.target.value)
								setUrl(e.target.value)
							}}
						/>
						<Button className='rounded-full' disabled={isLoading}>
							<ArrowUp />{' '}
							{isLoading && <Loader2 size={10} className='animate-spin' />}
						</Button>
					</div>
					<p className='text-red-500'>{urlError}</p>
				</div>
			</form>
		</div>
	)
}
