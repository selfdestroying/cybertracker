import type { Metadata } from 'next'
import CategoryProvider from './_src/providers/CategoryProvider'
import './globals.css'

export const metadata: Metadata = {
	title: 'Cyber Tracker',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<CategoryProvider>{children}</CategoryProvider>
			</body>
		</html>
	)
}
