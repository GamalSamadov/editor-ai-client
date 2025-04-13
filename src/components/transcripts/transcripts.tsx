import Link from "next/link"
import { useTranscripts } from "./useTranscripts"
import { Shine } from "../ui/shine/shine"
import { ETranscriptionJobStatus } from "@/services/transcript/transcript.types"
import { Loader2, Trash } from "lucide-react"
import { useDeleteTranscript } from "./useDeleteTranscript"
import { Dialog } from "../ui/dialog/Dialog"

export const Transcripts = () => {
  const { data: transcripts, isLoading: isLoadingTranscripts } =
    useTranscripts()

  const { deleteTranscript, isDeleting } = useDeleteTranscript()

  return (
    <div className="mt-4">
      <h2 className="text-zinc-800 dark:text-zinc-300 mb-2">Amaliyotlar:</h2>

      <div className="flex flex-col gap-2 mt-1">
        {isLoadingTranscripts ? (
          <div>Loading...</div>
        ) : !transcripts || transcripts.length === 0 ? (
          <div className="text-red-500">Amaliyot yo&apos;q.</div>
        ) : (
          transcripts?.map((transcript) => (
            <div
              className="rounded-md flex justify-between items-center gap-1 cursor-pointer text-sm"
              key={transcript.id}
            >
              <Link
                href={`/transcribe/${transcript.session.id}`}
                className="pl-2 py-1 hover:bg-zinc-500/30"
              >
                {transcript.status === ETranscriptionJobStatus.RUNNING ? (
                  <Shine>
                    <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {transcript.downloadedTitle
                        ? transcript.downloadedTitle
                        : "Ishga tushirilmoqda..."}
                    </span>
                  </Shine>
                ) : transcript.status === ETranscriptionJobStatus.COMPLETED ? (
                  <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {transcript.downloadedTitle}
                  </span>
                ) : (
                  transcript.status === ETranscriptionJobStatus.ERROR && (
                    <span className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-red-500">
                      {transcript.downloadedTitle}
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
                  deleteTranscript(transcript.id)
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
