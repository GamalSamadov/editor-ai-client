'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Loader2, LogOut, MoveVerticalIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useLogout } from './auth/useLogout'

export const ToggleUserTop = () => {
	const { logOut, isLoading } = useLogout()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className='cursor-pointer flex justify-end items-center gap-1'
					variant='link'
				>
					<span className='text-sm'>Muharrir</span>
					<MoveVerticalIcon className='text-zinc-300 dark:text-zinc-500' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='center'>
				<DropdownMenuItem disabled={isLoading}>
					<div
						onClick={() => {
							logOut()
						}}
					>
						{isLoading ? (
							<span className='flex items-center gap-4'>
								Chiqmoqda
								<Loader2 size={10} className='animate-spin' />
							</span>
						) : (
							<span className='flex items-center gap-4'>
								Chiqish <LogOut size={20} />
							</span>
						)}
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
