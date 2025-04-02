import { IS_PRODUCTION, TOKEN_EXPIRES } from "@/utils/constants"
import Cookies from "js-cookie"

export const getAccessToken = () => {
  if (typeof window === "undefined") {
    return null
  }
  const accessToken = Cookies.get("accessToken")

  return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
  if (typeof window === "undefined") {
    return
  }

  if (!accessToken) {
    return
  }

  Cookies.set("accessToken", accessToken, {
    path: "/",
    expires: TOKEN_EXPIRES,
    secure: IS_PRODUCTION,
    sameSite: "Lax",
  })
}

export const removeFromStorage = () => {
  if (typeof window === "undefined") {
    return
  }

  Cookies.remove("accessToken", {
    path: "/",
    secure: IS_PRODUCTION,
    sameSite: "Lax",
  })
}
