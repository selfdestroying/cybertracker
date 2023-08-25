import Image from 'next/image'
import Card from '../Card'

const TournamentCard = ({ image, name }: { image: string; name: string }) => {
	return (
		<Card className='glass w-full flex items-center rounded-xl p-3 mb-6'>
			<Image src={image} width={36} height={36} alt='' />
			<p className='has-tooltip ml-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>
				{name}
			</p>
		</Card>
	)
}

export default TournamentCard
