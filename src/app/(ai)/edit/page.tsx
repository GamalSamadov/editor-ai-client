import { Edit } from '@/components/edit/edit'
import { protectPage } from '@/utils/server/protect-page'

const EditPage = async () => {
	await protectPage()

	return <Edit />
}

export default EditPage
