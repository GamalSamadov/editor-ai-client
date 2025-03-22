'use client'

import { useStartEdit } from './useStartEdit'

export const Edit = () => {
	const { register, handleSubmit, formState, onSubmit, handleFileChange } =
		useStartEdit()

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					type='file'
					accept='.txt,.docx'
					{...register('file', { required: true })}
					onChange={handleFileChange}
				/>
				{formState.errors.file && <p>This file is required.</p>}
			</div>
			<button type='submit'>Submit</button>
		</form>
	)
}
