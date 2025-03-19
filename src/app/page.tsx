import { Auth } from '@/components/auth'
import { ModeToggle } from '@/components/toggle-dark-light'
import { PROTECTED_PAGES } from '@/config/pages/protected.config'
import { getServerAuth } from '@/utils/server/get-server-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
	const user = await getServerAuth()
	if (user) {
		return redirect(PROTECTED_PAGES.TRANSCRIBE)
	}

	return (
		<main className='relative'>
			<div className='absolute top-4 right-4'>
				<ModeToggle />
			</div>
			<div className='container mx-auto h-screen flex flex-col items-center justify-center gap-4'>
				<h1 className='font-sans font-bold text-3xl flex items-center gap-1'>
					<span>JanobMuharrir</span> <span className='text-4xl'>👨🏼‍💻</span>
				</h1>
				<div className='flex items-center justify-center'>
					<Auth />
				</div>
			</div>
		</main>
	)
}
