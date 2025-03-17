import { protectPage } from '@/utils/server/protect-page'

const DashboardPage = async () => {
	await protectPage()
	return <div>DashboardPage</div>
}

export default DashboardPage
