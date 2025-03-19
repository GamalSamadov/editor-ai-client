export const API_URL = 'http://localhost:4200/api'
export const IS_CLIENT = typeof window !== 'undefined'
export const TOKEN_EXPIRES = 7

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const URL_PATTERN =
	/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)$/
