import { getMatchesParams, parseMatchesData } from '@/utils/MatchService'
import { parseTournamentsData } from '@/utils/TournamentService'
import axios from 'axios'
import GamesSection from './_src/components/sections/GamesSection/GamesSection'
import TournamentsSection from './_src/components/sections/TournamentsSection/TournamentsSection'
const getAllTournaments = async (
	interval: string,
	game: string | null = null
): Promise<Tournament[]> => {
	const url: string = 'https://www.cybersport.ru/api/tournament-stages'
	try {
		const res = await axios.get(
			'https://www.cybersport.ru/api/tournament-stages?filter[interval]=future',
			{
				method: 'GET', // *GET, POST, PUT, DELETE, etc.
				// @ts-ignore
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *client
			}
		)
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
	try {
		const params = getMatchesParams(game)
		console.log(params)

		const res = await axios.get(url, {
			params,
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			// @ts-ignore
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
		})
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

export const revalidate = 0
