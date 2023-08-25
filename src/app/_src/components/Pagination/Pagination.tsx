'use client'

import ArrowButton from '../buttons/ArrowButton/ArrowButton'

const Pagination = ({
	width,
	currentPage,
	pageCount,
	onPageChange,
}: {
	width: string
	currentPage: number
	pageCount: number
	onPageChange: (page: number) => void
}) => {
	return (
		<div className={`flex justify-end ${width}`}>
			<div className='flex w-28 justify-between'>
				<ArrowButton
					onClick={
						currentPage <= 1
							? () => onPageChange(1)
							: () => onPageChange(currentPage - 1)
					}
					reversed={false}
				/>
				<ArrowButton
					onClick={
						currentPage === pageCount
							? () => onPageChange(pageCount)
							: () => onPageChange(currentPage + 1)
					}
					reversed={true}
				/>
			</div>
		</div>
	)
}

export default Pagination
