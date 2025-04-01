import { IS_PRODUCTION, TOKEN_EXPIRES } from "@/utils/constants"
import Cookies from "js-cookie"

const getBaseDomain = (url: string | undefined): string | undefined => {
  if (!url) return undefined
  try {
    const hostname = new URL(url).hostname
    const parts = hostname.split(".")
    if (parts.length >= 2) {
      return `.${parts.slice(-2).join(".")}`
    }
    return hostname
  } catch {
    return undefined
  }
}

const cookieDomain = IS_PRODUCTION
  ? getBaseDomain(process.env.NEXT_PUBLIC_BASE_URL)
  : "localhost"

export const getAccessToken = () => {
  const accessToken = Cookies.get("accessToken")
  console.log("accessToken", accessToken)
  return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
  Cookies.set("accessToken", accessToken, {
    domain: cookieDomain,
    sameSite: IS_PRODUCTION ? "Lax" : "None",
    expires: TOKEN_EXPIRES,
  })
}

export const removeFromStorage = () => {
  Cookies.remove("accessToken")
}
