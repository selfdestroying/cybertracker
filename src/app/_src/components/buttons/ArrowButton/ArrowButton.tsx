import Image from 'next/image'
import Button from '../Button'

const ArrowButton = ({
	reversed,
	onClick,
}: {
	reversed: boolean
	onClick: () => void
}) => {
	return (
		<Button
			onClick={onClick}
			className='cursor-pointer flex justify-center items-center glass w-10 h-10 rounded-xl'
		>
			<Image
				className={reversed ? 'rotate-180' : ''}
				src='/arrow.svg'
				width={10}
				height={16}
				alt=''
			/>
		</Button>
	)
}

export default ArrowButton
