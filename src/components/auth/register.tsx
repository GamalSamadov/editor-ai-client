'use client'

import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useAuthForm } from './useAuthForm'
import { EMAIL_PATTERN } from '@/utils/constants'

export const Register = () => {
	const [showPassword, setShowPassword] = useState(false)
	const { handleSubmit, isLoading, onSubmit, register, formState } =
		useAuthForm()

	const emailError = formState.errors.email?.message
	const passwordError = formState.errors.password?.message

	return (
		<form onSubmit={handleSubmit(onSubmit)} autoComplete='on'>
			<Card>
				<CardHeader>
					<CardTitle>Hisob ochish</CardTitle>
					<CardDescription>
						Hisob ochganingizdan keyin ushbu hisob admin tomonidan
						tasdiqlanmaganicha aktiv bo&apos;la olmaydi.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2'>
					<div className='space-y-1'>
						<Label htmlFor='name'>E-pochta</Label>
						<Input
							id='name'
							placeholder='info@samadov.dev'
							type='email'
							{...register('email', {
								required: 'Bu yer majburiy',
								pattern: {
									value: EMAIL_PATTERN,
									message: 'Xato email',
								},
							})}
						/>

						<p className='text-red-500'>{emailError}</p>
					</div>
					<div className='space-y-1'>
						<Label htmlFor='username'>Yangi parol</Label>
						<div className='w-full relative'>
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder='********'
								{...register('password', {
									required: 'Bu yer majburiy',
									minLength: {
										value: 8,
										message: 'Kamida 8ta belgi kiriting',
									},
								})}
							/>
							<p className='text-red-500'>{passwordError}</p>
							<Button
								variant='link'
								className='absolute top-0 right-0 cursor-pointer'
								onClick={() => setShowPassword(prev => !prev)}
								type='button'
							>
								{showPassword ? <EyeClosed size={22} /> : <Eye size={20} />}
							</Button>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button className='w-full' type='submit'>
						{isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
					</Button>
				</CardFooter>
			</Card>
		</form>
	)
}
