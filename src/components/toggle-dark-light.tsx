"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light")
        } else {
          setTheme("dark")
        }
      }}
    >
      {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
    </Button>
  )
}
