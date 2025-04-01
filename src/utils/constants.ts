export const IS_PRODUCTION = process.env.NEXT_PUBLIC_NODE_ENV === "production"
export const API_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api`

export const IS_CLIENT = typeof window !== "undefined"
export const TOKEN_EXPIRES = 7

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const URL_PATTERN =
  /^https?:\/\/(www\.)?(youtu\.be\/[A-Za-z0-9_-]+(\?.*)?|youtube\.com\/watch\?v=[A-Za-z0-9_-]+(\?.*)?)$/
