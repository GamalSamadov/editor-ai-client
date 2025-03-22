import React, { ReactNode } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog"
import { Button } from "../button"

type TVarian =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined

interface IProps {
  variant: TVarian
  title: string
  description?: string
  cancel: string
  save: string
  buttonContent: ReactNode
  disabled?: boolean
  className?: string
  onClick: () => void
  onOpenChange?: (isOpen: boolean) => void
  children: ReactNode
}

export const Dialog = ({
  variant,
  buttonContent,
  disabled = false,
  title,
  description = "",
  cancel,
  save,
  className,
  onClick,
  onOpenChange,
  children,
}: IProps) => {
  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} disabled={disabled} className={className}>
          {buttonContent}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>{save}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
