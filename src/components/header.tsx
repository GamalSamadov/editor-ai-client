"use client"

import { ModeToggle } from "./toggle-dark-light"
import { Menu, PanelLeftOpen } from "lucide-react"
import { LogoutButton } from "./logout-button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Aside } from "./aside"
import { twMerge } from "tailwind-merge"
import { useAtom } from "jotai"
import { sheetAtom } from "@/atoms/sheet.atom"
import { NewChatButton } from "./new-chat-button"

export const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useAtom(sheetAtom)

  return (
    <header
      className={twMerge(
        "flex items-center p-4 row-span-1 col-span-1 justify-between",
        isSheetOpen ? "lg:col-span-5" : "lg:col-span-5"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu size={22} className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader className="flex items-center flex-row justify-start gap-5">
                <SheetTitle>JanobAI</SheetTitle>
                <NewChatButton />
              </SheetHeader>
              <Aside />
            </SheetContent>
          </Sheet>
        </div>
        {!isSheetOpen && (
          <div className="flex items-center gap-4">
            <PanelLeftOpen
              size={22}
              className="cursor-pointer hidden lg:block"
              onClick={() => setIsSheetOpen(true)}
            />
            <NewChatButton />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <LogoutButton />
      </div>
    </header>
  )
}
