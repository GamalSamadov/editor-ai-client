import { Correction } from "@/components/correction/correction"
import { protectPage } from "@/utils/server/protect-page"

const CorrectionSessionsPage = async () => {
  await protectPage()
  return <Correction />
}

export default CorrectionSessionsPage
