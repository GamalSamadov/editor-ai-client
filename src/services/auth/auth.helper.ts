import { IS_PRODUCTION, TOKEN_EXPIRES } from "@/utils/constants"
import Cookies from "js-cookie"

// const getBaseDomain = (url: string | undefined): string | undefined => {
//   if (!url) return undefined
//   try {
//     const hostname = new URL(url).hostname
//     const parts = hostname.split(".")
//     if (parts.length >= 2) {
//       return `.${parts.slice(-2).join(".")}`
//     }
//     return hostname
//   } catch {
//     return undefined
//   }
// }

// const cookieDomain = IS_PRODUCTION
//   ? getBaseDomain(process.env.NEXT_PUBLIC_BASE_URL)
//   : "localhost"

export const getAccessToken = () => {
  // Ensure this runs only on the client
  if (typeof window === "undefined") {
    console.log("getAccessToken called server-side. Returning null.")
    return null
  }
  const accessToken = Cookies.get("accessToken")
  // Add more detailed logging for debugging
  console.log(
    "getAccessToken: Attempting to retrieve 'accessToken'. Found:",
    accessToken ? `"${accessToken}"` : "undefined"
  )
  return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
  if (typeof window === "undefined") {
    console.log("saveTokenStorage called server-side. Aborting.")
    return
  }

  if (!accessToken) {
    console.error(
      "saveTokenStorage: Attempted to save an empty or undefined token."
    )
    return
  }

  if (typeof TOKEN_EXPIRES !== "number" || TOKEN_EXPIRES <= 0) {
    console.warn(
      "saveTokenStorage: TOKEN_EXPIRES is invalid. Using default expiration (session). Value:",
      TOKEN_EXPIRES
    )
  }

  console.log(
    `saveTokenStorage: Saving token "${accessToken}" with expires: ${TOKEN_EXPIRES}, secure: ${IS_PRODUCTION}, sameSite: Lax`
  )

  Cookies.set("accessToken", accessToken, {
    // domain: cookieDomain,
    path: "/",
    expires: TOKEN_EXPIRES,
    secure: IS_PRODUCTION,
    sameSite: "Lax",
  })

  const checkToken = Cookies.get("accessToken")
  console.log(
    "saveTokenStorage: Verification check after set. Cookie 'accessToken' is:",
    checkToken ? `"${checkToken}"` : "undefined"
  )
}

export const removeFromStorage = () => {
  if (typeof window === "undefined") {
    console.log("removeFromStorage called server-side. Aborting.")
    return
  }

  console.log("removeFromStorage: Removing 'accessToken' cookie.")
  Cookies.remove("accessToken", {
    path: "/",
    // domain: cookieDomain,
    secure: IS_PRODUCTION,
    sameSite: "Lax",
  })
}
