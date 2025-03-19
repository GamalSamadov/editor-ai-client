import { PROTECTED_PAGES } from '@/config/pages/protected.config'
import { usePathname, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

const list = [
	{ icon: '📖', title: 'JanobMuharrir', href: PROTECTED_PAGES.EDIT },
	{ icon: '👨🏼‍💻', title: 'JanobYozuvchi', href: PROTECTED_PAGES.TRANSCRIBE },
]

export const Aside = () => {
	const router = useRouter()
	const pathname = usePathname()

	console.log(pathname)
	return (
		<aside>
			<div className='px-6 '>
				<ul className='space-y-1'>
					{list.map((item, index) => (
						<li
							key={index}
							className={twMerge(
								'p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-900 cursor-pointer flex items-center flex-nowrap gap-2 overflow-hidden text-ellipsis',
								pathname === item.href ? 'bg-zinc-200 dark:bg-zinc-900' : ''
							)}
							onClick={() => router.push(item.href)}
						>
							<span className='text-xl'>{item.icon}</span>{' '}
							<span className='text-sm'>{item.title}</span>
						</li>
					))}
				</ul>
			</div>

			<div></div>
		</aside>
	)
}
