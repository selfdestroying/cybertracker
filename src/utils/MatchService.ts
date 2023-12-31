import moment from 'moment'
const games: Games = {
	cs: '19',
	dota: '21',
}

export const getTime = () => {
	const dateNow = moment().utcOffset(3).format('YYYY-MM-DD HH:mm:ss')
	console.log(dateNow)
	return dateNow
}

export const getMatchesParams = (game: string | null): MatchesRequestParams => {
	const time = getTime()
	if (game) {
		return {
			sort: 'date',
			'filter[dateTimeAfter]': time,
			'filter[disciplineIds]': games[game],
		}
	}

	return {
		sort: 'date',
		'filter[dateTimeAfter]': time,
	}
}

export const parseMatchesData = (res: any): Match[] => {
	const data = res['data']
	const included = res['included']
	const matches = []

	for (const match of data) {
		let participant1 = ''
		let participant2 = ''
		let participant1Logo = ''
		let participant2Logo = ''
		let tournament = ''
		const time = match['attributes']['time']
		const date = match['attributes']['date']
		const disciplineID = match['relationships']['discipline']['data']['id']
		if (!['19', '21'].includes(disciplineID)) {
			continue
		}
		const stageID = match['relationships']['stage']['data']['id']
		const participant1ID = match['relationships']['participant1']['data']['id']
		const participant2ID = match['relationships']['participant2']['data']['id']
		for (const item of included) {
			if (item['type'] === 'stage') {
				if (item['id'] === stageID) {
					tournament = item['attributes']['title']
				}
			}

			if (item['type'] === 'match_participant') {
				if (item['id'] === participant1ID) {
					if (item['attributes']['isTbd']) {
						participant1 = 'TBD'
					} else {
						if (item['relationships']['team']['data']) {
							const teamID = item['relationships']['team']['data']['id']
							for (const id of included) {
								if (id['type'] === 'team') {
									if (id['id'] === teamID) {
										participant1 = id['attributes']['title']
										participant1Logo = id['attributes']['logo']
									}
								}
							}
						} else {
							participant1 = item['attributes']['custom']
						}
					}
				}
				if (item['id'] === participant2ID) {
					if (item['attributes']['isTbd']) {
						participant2 = 'TBD'
					} else {
						if (item['relationships']['team']['data']) {
							const teamID = item['relationships']['team']['data']['id']
							for (const id of included) {
								if (id['type'] === 'team') {
									if (id['id'] === teamID) {
										participant2 = id['attributes']['title']
										participant2Logo = id['attributes']['logo']
									}
								}
							}
						} else {
							participant2 = item['attributes']['custom']
						}
					}
				}
			}
		}
		matches.push({
			discipline: disciplineID,
			tournament: tournament,
			participant1: participant1,
			participant2: participant2,
			participant1Logo: participant1Logo
				? participant1Logo
				: disciplineID === '19'
				? '/csgo-logo.svg'
				: '/dota-2-logo.svg',
			participant2Logo: participant2Logo
				? participant2Logo
				: disciplineID === '19'
				? '/csgo-logo.svg'
				: '/dota-2-logo.svg',
			date: date,
			time: time,
		})
	}
	return matches
}
