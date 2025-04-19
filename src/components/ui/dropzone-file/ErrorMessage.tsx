"use client"

interface ErrorMessageProps {
  message?: string | null
  className?: string
}

export const ErrorMessage = ({
  message,
  className = "",
}: ErrorMessageProps) => {
  if (!message) return null

  return (
    <p
      className={`px-3.5 -mt-2 text-center text-sm text-red-600 dark:text-red-400 ${className}`}
    >
      {message}
    </p>
  )
}
