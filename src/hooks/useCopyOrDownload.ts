import { Document, Packer } from "docx"
import { saveAs } from "file-saver"
import { useState } from "react"
import { toast } from "sonner"

import { IEvent } from "@/services/event/event.types"
import { parseHtmlToDocx } from "@/helpers/parseHtmlToDocx"

export const useCopyOrDownload = (events: IEvent[]) => {
  const [copied, setCopied] = useState(false)
  const [downloadTitle, setDownloadTitle] = useState(
    "janobYozuvchi-tomonidan-yozilgan-hujjat"
  )

  const htmlContent = events?.[events.length - 1]?.content ?? ""

  async function handleDownloadDocx() {
    try {
      // 1) Convert HTML to paragraphs
      const paragraphs = parseHtmlToDocx(htmlContent)

      // 2) Build the docx
      const doc = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      })

      // 3) Generate a Blob, then save
      const blob = await Packer.toBlob(doc)
      saveAs(blob, `${downloadTitle}.docx`)
      toast.success("Fayl yuklandi")
    } catch {
      toast.error("Fayl yuklashda xatolik yuz berdi")
    }
  }

  function handleCopy() {
    const parser = new DOMParser()
    const parsed = parser.parseFromString(htmlContent, "text/html")
    const textOnly = parsed.body.textContent ?? ""

    navigator.clipboard.writeText(textOnly).then(() => {
      setCopied(true)
      toast.success("Kopiyalandi")
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return {
    handleDownloadDocx,
    handleCopy,
    copied,
    htmlContent,
    setDownloadTitle,
  }
}
