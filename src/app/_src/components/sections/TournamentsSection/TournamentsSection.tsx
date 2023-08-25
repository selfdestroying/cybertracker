'use client'
import { CategoryContext } from '@/app/_src/providers/CategoryProvider'
import { useContext, useMemo, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import AllButton from '../../buttons/AllButton/AllButton'
import GameButton from '../../buttons/GameButton/GameButton'
import TournamentCard from '../../cards/TournamentCard/TournamentCard'
export default function TournamentsSection({
	tournaments,
}: {
	tournaments: Tournament[]
}) {
	const [tournamentsArr, setTournamentsArr] = useState(tournaments)
	const { filter, setFilter } = useContext(CategoryContext)
	const [pageCount, setPageCount] = useState(
		Math.ceil(tournamentsArr.length / 7)
	)
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 7
	const onPageChange = (page: number) => {
		setCurrentPage(page)
	}
	const paginate = (
		items: Tournament[],
		pagenNumber: number,
		pageSize: number
	) => {
		const startIndex = (pagenNumber - 1) * pageSize
		return items.slice(startIndex, startIndex + pageSize)
	}

	const filteredTournaments = useMemo(() => {
		setCurrentPage(1)
		let filteredTournaments = tournamentsArr
		if (filter === 'All') {
			setPageCount(Math.ceil(filteredTournaments.length / 7))
			return filteredTournaments
		}
		filteredTournaments = tournamentsArr.filter(tournament => {
			return tournament.tournamentDiscipline === filter
		})
		setPageCount(Math.ceil(filteredTournaments.length / 7))
		return filteredTournaments
	}, [filter, tournamentsArr])
	const paginatedTournaments = paginate(
		filteredTournaments,
		currentPage,
		pageSize
	)
	return (
		<div className='glass flex flex-col items-center h-4/5 w-1/6 rounded-3xl p-6'>
			<div className='flex flex-col justify-between h-full w-full'>
				<div className='flex justify-between w-full'>
					<AllButton onClick={() => setFilter('All')} />
					<GameButton
						onClick={() => setFilter('21')}
						image='/dota-2-logo.svg'
					/>
					<GameButton onClick={() => setFilter('19')} image='/csgo-logo.svg' />
				</div>
				<div className='w-full h-full mt-9'>
					{paginatedTournaments.map(game => (
						<TournamentCard
							key={game.id}
							image={
								game.tournamentDiscipline === '19'
									? '/csgo-logo.svg'
									: '/dota-2-logo.svg'
							}
							name={game.tournamentName}
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
