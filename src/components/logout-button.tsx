import { Loader2, LogOut } from "lucide-react"
import { useLogout } from "./auth/useLogout"
import { Dialog } from "./ui/dialog/Dialog"

export const LogoutButton = () => {
  const { logOut, isLoading } = useLogout()

  return (
    <Dialog
      title="Chiqish"
      cancel="Bekor qilish"
      save="Chiqish"
      buttonContent={
        isLoading ? <Loader2 className="animate-spin" /> : <LogOut />
      }
      variant="default"
      onClick={() => {
        logOut()
      }}
    >
      <p>Chiqishni tasdiqlang</p>
    </Dialog>
  )
}
