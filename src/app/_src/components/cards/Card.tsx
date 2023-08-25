const Card = ({
	children,
	...className
}: {
	children: React.ReactNode
	className?: string
}) => {
	return <div {...className}>{children}</div>
}

export default Card
