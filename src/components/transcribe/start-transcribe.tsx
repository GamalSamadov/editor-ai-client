"use client"

import { ArrowUp, Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { useStartTranscribe } from "./hooks/useStartTranscribe"
import { URL_PATTERN } from "@/utils/constants"
import { Button } from "../ui/button"
import { FileInput } from "../file-upload"

export const StartTranscribe = () => {
  const { onSubmit, register, handleSubmit, formState, isLoading } =
    useStartTranscribe()

  const urlError = formState.errors.url?.message
  return (
    <div className="p-4 w-full h-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold text-center">JanobYozuvchi👨🏼‍💻</h1>
      <FileInput />
      <p className="text-center">yoki</p>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <div className="w-[90vw] lg:w-[50vw] flex items-center justify-center flex-col gap-6">
            <div className="w-full flex items-center justify-center gap-2">
              <Input
                placeholder="Video manzilini kiriting..."
                {...register("url", {
                  required: "Bu yer majburiy",
                  pattern: {
                    value: URL_PATTERN,
                    message: "Manzilni to'g'ri kiriting.",
                  },
                })}
                className="w-full h-full px-3 py-4"
              />

              <Button className="rounded-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 size={10} className="animate-spin" />
                ) : (
                  <ArrowUp />
                )}
              </Button>
            </div>
            <p className="text-red-500">{urlError}</p>
          </div>
        </form>
      </div>
    </div>
  )
}
