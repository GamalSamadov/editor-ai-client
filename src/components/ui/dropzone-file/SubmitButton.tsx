"use client"

import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "../button"

interface SubmitButtonProps {
  isLoading: boolean
  isValid: boolean
  isSubmitting: boolean
}

export const SubmitButton = ({
  isLoading,
  isValid,
  isSubmitting,
}: SubmitButtonProps) => (
  <div className="flex justify-center mt-6">
    <Button type="submit" disabled={isLoading || !isValid || isSubmitting}>
      {(isLoading || isSubmitting) && (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      )}
      {isLoading
        ? "Yuritilmoqda..."
        : isSubmitting
          ? "Yuklanmoqda..."
          : "Yuborish"}
    </Button>
  </div>
)
