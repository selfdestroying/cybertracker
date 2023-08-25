import { getMatchesParams, parseMatchesData } from '@/utils/MatchService'
import {
	getTournamentsParams,
	parseTournamentsData,
} from '@/utils/TournamentService'
import axios from 'axios'
import GamesSection from './_src/components/sections/GamesSection/GamesSection'
import TournamentsSection from './_src/components/sections/TournamentsSection/TournamentsSection'
const getAllTournaments = async (
	interval: string,
	game: string | null = null
): Promise<Tournament[]> => {
	const url: string = 'https://www.cybersport.ru/api/tournament-stages'
	console.log('TournamentService.ts:getAllTournaments')
	try {
		const params = getTournamentsParams(game, interval)
		const res = await axios.get(url, { params })
		if (!res.data['data']) {
			return []
		}
		const data = res.data['data']
		const tournaments = parseTournamentsData(data)
		return tournaments
	} catch (e) {
		console.log(e)
		return []
	}
}
const getAllMatches = async (game: string | null = null): Promise<Match[]> => {
	const url = 'https://www.cybersport.ru/api/matches'
	console.log('MatchService.ts:getAllMatches')
	try {
		const params = getMatchesParams(game)
		const res = await axios.get(url, { params })
		if (!res.data['data']) {
			return []
		}
		const matches = parseMatchesData(res.data)

		return matches
	} catch (e) {
		console.log(e)
		return []
	}
}
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
