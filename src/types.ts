interface Date {
	year: number | null
	month: number | null
	day: number | null
}
interface Games {
	[key: string]: string
}

interface Tournament {
	id: number
	tournamentName: string
	tournamentDiscipline: string
	startDate: Date
	endDate: Date
}
interface Match {
	discipline: string
	tournament: string
	participant1: string
	participant2: string
	participant1Logo: string
	participant2Logo: string
	date: string
	time: string
}

interface TournamentsRequestParams {
	'filter[disciplines]'?: string
	'filter[interval]': string
	'filter[tiers]': number
}

interface MatchesRequestParams {
	sort: string
	'filter[dateTimeAfter]': string
	'filter[disciplineIds]'?: string
}
