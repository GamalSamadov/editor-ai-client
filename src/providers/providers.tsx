"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"
import { ThemeProvider } from "./theme"
import { Toaster } from "sonner"

const Providers = ({ children }: PropsWithChildren) => {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers
