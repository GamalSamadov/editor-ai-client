"use client"

import { useState } from "react"
import { Eye, EyeClosed, Loader2 } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthForm } from "./useAuthForm"
import { EMAIL_PATTERN } from "@/utils/constants"

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { handleSubmit, isLoading, onSubmit, register, formState } =
    useAuthForm(true)

  const emailError = formState.errors.email?.message
  const passwordError = formState.errors.password?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
      <Card>
        <CardHeader>
          <CardTitle>Kirish</CardTitle>
          <CardDescription>
            Platformadan foidalanish uchun admin tomonidan tasdiqlangan hisob
            ila kirishingiz kerak.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">E-pochta</Label>
            <Input
              id="name"
              placeholder="info@samadov.dev"
              type="email"
              {...register("email", {
                required: "Bu yer majburiy",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Xato email",
                },
              })}
            />

            <p className="text-red-500">{emailError}</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Parol</Label>
            <div className="w-full relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Bu yer majburiy",
                  minLength: {
                    value: 8,
                    message: "Kamida 8ta belgi kiriting",
                  },
                })}
              />
              <p className="text-red-500">{passwordError}</p>
              <Button
                variant="link"
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {showPassword ? <EyeClosed size={22} /> : <Eye size={22} />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            <span>Kirish</span>{" "}
            {isLoading && <Loader2 size={10} className="animate-spin" />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
