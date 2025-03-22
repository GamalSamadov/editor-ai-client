'use client'

import { useAtom } from 'jotai'
import { sheetAtom } from '@/atoms/sheet.atom'
import { twMerge } from 'tailwind-merge'
import { PanelRightOpen } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { Aside } from '@/components/aside'
import { Header } from '@/components/header'
import { NewChatButton } from '@/components/new-chat-button'

const LayoutAI = ({ children }: PropsWithChildren) => {
	const [isSheetOpen, setIsSheetOpen] = useAtom(sheetAtom)

	return (
		<main className='flex h-screen'>
			<aside
				className={twMerge(
					'hidden',
					isSheetOpen &&
						'bg-zinc-100 dark:bg-zinc-950 lg:block h-screen overflow-y-auto w-72 scrollbar'
				)}
			>
				<div className='flex items-center justify-between px-6 py-5.5'>
					{isSheetOpen && (
						<>
							<PanelRightOpen
								size={22}
								className='cursor-pointer hidden lg:block'
								onClick={() => setIsSheetOpen(false)}
							/>
							<NewChatButton />
						</>
					)}
				</div>
				<Aside />
			</aside>
			<div
				className={twMerge(
					'px-1 md:px-2 flex flex-col justify-between overflow-hidden w-full'
				)}
			>
				<Header />
				<div className='overflow-auto w-full h-full'>{children}</div>

				<p className='py-3 text-center text-sm text-zinc-600 dark:text-zinc-500 select-none'>
					JanobJIN xato qilishi mumkun. Ma&apos;lumotlarni tekshiring.
				</p>
			</div>
		</main>
	)
}

export default LayoutAI
