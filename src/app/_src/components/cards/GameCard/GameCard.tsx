import TeamButton from '../../buttons/TeamButton/TeamButton'
import Card from '../Card'

const GameCard = ({
	tournamentName,
	team1Name,
	team2Name,
	team1Image,
	team2Image,
	date,
}: {
	tournamentName: string
	team1Name: string
	team2Name: string
	team1Image: string
	team2Image: string
	date: string
}) => {
	return (
		<Card className='glass w-full flex items-center rounded-xl p-3 mb-7'>
			<p className='w-1/4'>{tournamentName}</p>
			<div className='flex items-center justify-evenly w-1/2'>
				<p className='w-1/4 text-right'>{team1Name}</p>
				<div className='flex items-center justify-evenly w-1/2'>
					<TeamButton image={team1Image} />
					<p>VS</p>
					<TeamButton image={team2Image} />
				</div>
				<p className='w-1/4'>{team2Name}</p>
			</div>
			<p className='w-1/4 text-right'>{date}</p>
		</Card>
	)
}

export default GameCard
