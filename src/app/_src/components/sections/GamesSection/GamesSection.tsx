'use client'
import { CategoryContext } from '@/app/_src/providers/CategoryProvider'
import { useContext, useMemo, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import GameCard from '../../cards/GameCard/GameCard'

const GamesSection = ({ matches }: { matches: Match[] }) => {
	const [matchesArr, setMatchesArr] = useState(matches)
	const [pageCount, setPageCount] = useState(Math.ceil(matchesArr.length / 7))
	const { filter, setFilter } = useContext(CategoryContext)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 7
	const onPageChange = (page: number) => {
		setCurrentPage(page)
	}
	const paginate = (items: Match[], pagenNumber: number, pageSize: number) => {
		const startIndex = (pagenNumber - 1) * pageSize
		return items.slice(startIndex, startIndex + pageSize)
	}
	const filteredMatches = useMemo(() => {
		setCurrentPage(1)

		let filteredTournaments = matchesArr
		if (filter === 'All') {
			setPageCount(Math.ceil(filteredTournaments.length / 7))
			return filteredTournaments
		}
		filteredTournaments = matchesArr.filter(match => {
			return match.discipline === filter
		})
		setPageCount(Math.ceil(filteredTournaments.length / 7))
		return filteredTournaments
	}, [filter, matchesArr])
	const paginatedMatches = paginate(filteredMatches, currentPage, pageSize)

	return (
		<div className='glass flex flex-col items-center h-4/5 w-3/4 rounded-3xl p-6'>
			<div className='flex flex-col justify-between h-full w-full'>
				<div className='h-full w-full'>
					{paginatedMatches.map(game => (
						<GameCard
							key={paginatedMatches.indexOf(game)}
							tournamentName={game.tournament}
							date={`${game.date} ${game.time}`}
							team1Name={game.participant1}
							team2Name={game.participant2}
							team1Image={game.participant1Logo}
							team2Image={game.participant2Logo}
						/>
					))}
				</div>
				<Pagination
					currentPage={currentPage}
					pageCount={pageCount}
					onPageChange={onPageChange}
					width='w-full'
				/>
			</div>
		</div>
	)
}

export default GamesSection
