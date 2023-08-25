import Button from '../Button'

const AllButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button
			onClick={onClick}
			className='glass cursor-pointer flex items-center justify-center w-28 h-12 rounded-xl'
		>
			All
		</Button>
	)
}

export default AllButton
