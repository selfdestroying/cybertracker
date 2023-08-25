import getAllMatches from '@/api/MatchService'
import getAllTournaments from '@/api/TournamentService'
import GamesSection from './_src/components/sections/GamesSection/GamesSection'
import TournamentsSection from './_src/components/sections/TournamentsSection/TournamentsSection'

export default async function Page() {
	const tournaments = await getAllTournaments('future')
	const matches = await getAllMatches()
	console.log('Page.tsx')

	return (
		<div className='h-screen flex flex-col'>
			<p className='text-2xl text-gray-600'>Alpha build</p>
			<div className='h-full flex justify-around items-center'>
				<TournamentsSection tournaments={tournaments} />
				<GamesSection matches={matches} />
			</div>
		</div>
	)
}
export const revalidate = 5
