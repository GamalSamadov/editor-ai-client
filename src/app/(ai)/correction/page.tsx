import { StartCorrection } from "@/components/correction/start-correction"
import { protectPage } from "@/utils/server/protect-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JanobBelgichi - Matnni bexato tinish berlgilarini qo'yish",
  description:
    "JanobBelgichi - Sun'iy intillekt orqali ishlovchi o'zbekcha matnni bexato tahrirluvchi ajoib madel",
}

const CorrectionPage = async () => {
  await protectPage()

  return <StartCorrection />
}

export default CorrectionPage
