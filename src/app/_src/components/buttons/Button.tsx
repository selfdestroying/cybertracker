import Link from 'next/link'

const Button = ({
	children,
	onClick,
	...className
}: {
	children: React.ReactNode
	onClick: () => void
	className?: string
}) => {
	return (
		<Link onClick={onClick} href='/'>
			<div {...className}>{children}</div>
		</Link>
	)
}

export default Button
