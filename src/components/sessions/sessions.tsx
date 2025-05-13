import Link from "next/link"
import { useSessions } from "./useSessions"
import { Shine } from "../ui/shine/shine"
import { Loader2, Trash } from "lucide-react"
import { useDeleteSession } from "./useDeleteSession"
import { Dialog } from "../ui/dialog/Dialog"
import { isCompleted, isError, isRunning } from "./helpers/isRunning"
import { ESessionType } from "@/services/session/session.types"
import { Loaders } from "./loaders"

export const Sessions = () => {
  const { data: sessions, isLoading } = useSessions()

  const { deleteSession, isDeleting } = useDeleteSession()

  return (
    <div className="mt-4">
      <h2 className="text-zinc-800 dark:text-zinc-300 mb-2">Amaliyotlar:</h2>

      <div className="flex flex-col gap-2 mt-1">
        {isLoading ? (
          <Loaders />
        ) : !sessions || sessions.length === 0 ? (
          <div className="text-red-500">Amaliyot yo&apos;q.</div>
        ) : (
          sessions?.map((session) => (
            <div
              className="rounded-md flex justify-between items-center gap-1 cursor-pointer text-sm"
              key={session.id}
            >
              <Link
                href={`/${session.type === ESessionType.TRANSCRIBE ? "transcribe" : session.type === ESessionType.EDIT && "edit"}/${session.id}`}
                className="pl-2 py-1 hover:bg-zinc-500/30"
              >
                {isRunning(session) ? (
                  <Shine>
                    <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {session.title ? session.title : "Ishga tushirilmoqda..."}
                    </span>
                  </Shine>
                ) : isCompleted(session) ? (
                  <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {session.title}
                  </span>
                ) : (
                  isError(session) && (
                    <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-red-500">
                      {session.title}
                    </span>
                  )
                )}
              </Link>
              <Dialog
                title="Amaliyotni o'chirish:"
                cancel="Bekor qilish"
                save="Tasdiqlash"
                buttonContent={
                  isDeleting ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Trash size={15} className="text-red-500" />
                  )
                }
                onClick={() => {
                  deleteSession(session.id)
                }}
                disabled={isDeleting}
                variant="outline"
                className="cursor-pointer z-10"
              >
                <p>O&apos;chirishni tasdiqlang</p>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
