export interface IUser {
	id: number
	name?: string
	email: string
	verificationToken?: string
}

export interface IAuthFormData extends Pick<IUser, 'email'> {
	password: string
}

export interface ITranscribeFormData {
	url: string
}
