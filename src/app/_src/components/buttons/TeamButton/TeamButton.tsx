import Image from 'next/image'
import Button from '../Button'

const imageLoader = ({ src }: any) => {
	return `https://virtus-img.cdnvideo.ru/images/team-list-logo/plain/${src}`
}
const TeamButton = ({ image }: { image: string }) => {
	if (image[0] != '/') {
		return (
			<Button
				onClick={() => null}
				className='glass cursor-pointer flex items-center justify-center w-12 h-12 rounded-xl'
			>
				<Image src={image} width={36} height={36} alt='' loader={imageLoader} />
			</Button>
		)
	}
	return (
		<Button
			onClick={() => null}
			className='glass cursor-pointer flex items-center justify-center w-12 h-12 rounded-xl'
		>
			<Image src={image} width={36} height={36} alt='' />
		</Button>
	)
}

export default TeamButton
