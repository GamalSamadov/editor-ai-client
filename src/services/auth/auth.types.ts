export interface ITokenInside {
  id: number
  name: string
  email: string
  iat: number
  exp: number
}

export type TProtectUserData = Omit<ITokenInside, "iat" | "exp">
