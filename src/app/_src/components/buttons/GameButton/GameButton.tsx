import Image from 'next/image'
import Button from '../Button'

const GameButton = ({
	image,
	onClick,
}: {
	image: string
	onClick: () => void
}) => {
	return (
		<Button
			onClick={onClick}
			className='glass cursor-pointer flex items-center justify-center w-12 h-12 rounded-xl'
		>
			<Image src={image} width={36} height={36} alt='' />
		</Button>
	)
}

export default GameButton
