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
		<main className='grid grid-cols-1 lg:grid-cols-6 grid-rows-10 h-screen'>
			<div
				className={twMerge(
					'hidden',
					isSheetOpen &&
						'lg:col-span-1 row-span-10 bg-zinc-100 dark:bg-zinc-950 lg:block lg:h-screen'
				)}
			>
				<div className='flex items-center justify-between px-6 py-5.5'>
					{isSheetOpen && (
						<>
							<PanelRightOpen
								size={25}
								className='cursor-pointer hidden lg:block'
								onClick={() => setIsSheetOpen(false)}
							/>
							<NewChatButton />
						</>
					)}
				</div>
				<Aside />
			</div>
			<div
				className={twMerge(
					'px-1 md:px-2 col-span-1 row-span-10 flex flex-col justify-between overflow-hidden',
					isSheetOpen ? 'lg:col-span-5' : 'lg:col-span-6'
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
