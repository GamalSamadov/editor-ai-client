import { Edit } from "@/components/edit/edit"
import { protectPage } from "@/utils/server/protect-page"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JanobMuharrir - Matnni bexato tahrirlash",
  description:
    "JanobMuharrir - Sun'iy intillekt orqali ishlovchi o'zbekcha matnni bexato tahrirluvchi ajoib madel",
}

const EditPage = async () => {
  await protectPage()

  return <Edit />
}

export default EditPage
