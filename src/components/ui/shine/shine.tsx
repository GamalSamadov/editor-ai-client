import { PropsWithChildren } from 'react'

export const Shine = ({ children }: PropsWithChildren) => {
	return (
		<div className='text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#a9a9a9] dark:from-[#a3a3a3] via-[#000] dark:via-[#ffffff] to-[#a9a9a9] dark:to-[#a3a3a3] bg-[length:200%_100%] bg-[position:100%] animate-[shine_3s_linear_infinite] whitespace-nowrap no-underline'>{children}</div>
	)
}
