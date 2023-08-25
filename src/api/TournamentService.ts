import axios from 'axios'

const games: Games = {
	cs: '19',
	dota: '21',
}
const tier: number = 1
const url: string = 'https://www.cybersport.ru/api/tournament-stages'

const getParams = (
	game: string | null,
	interval: string
): TournamentsRequestParams => {
	if (!game) {
		return {
			'filter[interval]': interval,
			'filter[tiers]': tier,
		}
	}
	return {
		'filter[disciplines]': games[game],
		'filter[interval]': interval,
		'filter[tiers]': tier,
	}
}

const parseTournamentsData = (data: any): Tournament[] => {
	const parsedData = []

	for (const tournament of data) {
		const attrs = tournament['attributes']
		const relations = tournament['relationships']

		const tournament_name = attrs['title']
		const tournament_discipline = relations['discipline']['data']['id']

		if (!['19', '21'].includes(tournament_discipline)) {
			continue
		}
		const start_date = attrs['since']
		const end_date = attrs['till']
		if (!start_date['month']) {
			start_date['month'] = 12
		}
		if (!start_date['day']) {
			start_date['day'] = 31
		}
		parsedData.push({
			id: data.indexOf(tournament),
			tournamentName: tournament_name,
			tournamentDiscipline: tournament_discipline,
			startDate: start_date,
			endDate: end_date,
		})
	}

	return parsedData
}

const getAllTournaments = async (
	interval: string,
	game: string | null = null
): Promise<Tournament[]> => {
	console.log('Ping')
	try {
		const params = getParams(game, interval)
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

export default getAllTournaments
