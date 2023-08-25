'use client'

import { createContext, useState } from 'react'

export const CategoryContext = createContext({
	filter: 'All',
	setFilter: (filter: string) => {},
})

export default function CategoryProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [filter, setFilter] = useState('All')
	return (
		<CategoryContext.Provider
			value={{
				filter,
				setFilter,
			}}
		>
			{children}
		</CategoryContext.Provider>
	)
}
