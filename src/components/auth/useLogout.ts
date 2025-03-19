import authService from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

export const useLogout = () => {
	const router = useRouter()
	const [isLogoutTransition, startIsLogoutTransition] = useTransition()

	const { mutate, isPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),

		onSuccess() {
			startIsLogoutTransition(() => {
				router.push('/')
			})
		},
		onError(error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data?.message) {
					toast.error(error.response?.data?.message)
				}
				if (error.response?.data.errors[0].msg) {
					toast.error(error.response?.data.errors[0].msg)
				}
				toast.error('Qandaydir xatolik yuz berdi.')
			}
		},
	})

	const logOut = () => {
		mutate()
	}

	const isLoading = isPending || isLogoutTransition

	return { logOut, isLoading }
}
