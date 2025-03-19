import { Transcribe } from '@/components/transcribe/transcribe'
import { protectPage } from '@/utils/server/protect-page'

const TranscribePage = async () => {
	await protectPage()
	return <Transcribe />
}

export default TranscribePage
