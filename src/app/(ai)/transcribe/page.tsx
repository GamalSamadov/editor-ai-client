import { StartTranscribe } from '@/components/transcribe/start-transcribe'
import { protectPage } from '@/utils/server/protect-page'

const StartTranscribePage = async () => {
	await protectPage()
	return <StartTranscribe />
}

export default StartTranscribePage
