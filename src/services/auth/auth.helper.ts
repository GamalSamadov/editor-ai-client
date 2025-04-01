import { TOKEN_EXPIRES } from "@/utils/constants" // Keep if using for manual expiry, otherwise optional

const ACCESS_TOKEN_KEY = "accessToken"

export const getAccessToken = () => {
  if (typeof window === "undefined") {
    return null
  }
  console.log(
    `[getAccessToken] Trying to get token from localStorage key "${ACCESS_TOKEN_KEY}"...`
  )
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  console.log(
    "[getAccessToken] Token found:",
    token ? `${token.substring(0, 10)}...` : "null or undefined"
  )
  return token
}

export const saveTokenStorage = (accessToken: string | null) => {
  if (typeof window === "undefined") {
    return
  }
  console.log(
    `[saveTokenStorage] Attempting to save token to localStorage key "${ACCESS_TOKEN_KEY}":`,
    accessToken
      ? `${accessToken.substring(0, 10)}...`
      : "null or undefined received"
  )
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    console.log("[saveTokenStorage] Token saved.")
    const expiryTime = new Date(
      new Date().getTime() + TOKEN_EXPIRES * 24 * 60 * 60 * 1000
    )
    localStorage.setItem("accessTokenExpiry", expiryTime.toISOString())
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem("accessTokenExpiry") // Also remove expiry if used
    console.warn(
      "[saveTokenStorage] Received null/empty token. Removed existing token from storage."
    )
  }
}

export const removeFromStorage = () => {
  if (typeof window === "undefined") {
    return
  }
  console.log(
    `[removeFromStorage] Removing token from localStorage key "${ACCESS_TOKEN_KEY}"`
  )
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem("accessTokenExpiry")
}
