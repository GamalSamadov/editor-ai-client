import { StartTranscribe } from "@/components/transcribe/start-transcribe"
import { protectPage } from "@/utils/server/protect-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JanobYozuvchi - Matnni bexato tahrirlash",
  description:
    "JanobMuharrir - Sun'iy intillekt orqali ishlovchi o'zbekcha youtube platformasidagi videolarni matnga bexato o'giruvchi ajoib madel",
}

const StartTranscribePage = async () => {
  await protectPage()
  return <StartTranscribe />
}

export default StartTranscribePage
