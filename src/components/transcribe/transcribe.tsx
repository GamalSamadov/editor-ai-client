"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { Loader } from "../ui/loader/loader"
import { Shine } from "../ui/shine/shine"

import { Button } from "../ui/button"
import { useTranscribe } from "./hooks/useTranscribe"
import { useCopyOrDownload } from "./hooks/useCopyOrDownload"
import { Check, Copy, Download, Video } from "lucide-react"
import { Dialog } from "../ui/dialog/Dialog"
import { Input } from "../ui/input"

export function Transcribe() {
  const { completed, url, events } = useTranscribe()
  const {
    handleDownloadDocx,
    handleCopy,
    copied,
    htmlContent,
    setDownloadTitle,
  } = useCopyOrDownload(events)

  if (!url) {
    return redirect("/transcribe")
  }

  return (
    <div className="p-4 w-full h-full flex items-center justify-center">
      {!completed ? (
        <div className="w-full h-150 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex justify-center items-center flex-col gap-5">
          <Loader />
          <Shine>
            {events.length > 0
              ? events[events.length - 1].content
              : "Ishga tushirildi..."}
          </Shine>
        </div>
      ) : (
        <div className="w-full h-full rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex justify-center items-start flex-col gap-4 overflow-y-auto p-6 scrollbar">
          <div className="h-full">
            <div className="w-full flex flex-row justify-between gap-2 my-4">
              <Link href={url} target="_blank">
                <Button>
                  <Video /> Video
                </Button>
              </Link>

              <div>
                <Button onClick={handleCopy} disabled={copied}>
                  {copied ? <Check /> : <Copy />}
                </Button>
                <Dialog
                  buttonContent={<Download />}
                  variant="outline"
                  title="Nom kiriting:"
                  description='Agar nom kiritmasangiz faylning nomi: "janobYozuvchi-tomonidan-yozilgan-hujjat" bo&apos;lib jihozingizga yuklanadi.'
                  cancel="Bekor qilish"
                  save="Yuklab olish"
                  onClick={handleDownloadDocx}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setDownloadTitle(
                        "janobYozuvchi-tomonidan-yozilgan-hujjat"
                      )
                    }
                  }}
                >
                  <label htmlFor="name">Nom:</label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Masalan: 300 Baqara surasi"
                    onChange={(e) => setDownloadTitle(e.target.value)}
                  />
                </Dialog>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="pb-10"
            />
          </div>
        </div>
      )}
    </div>
  )
}
