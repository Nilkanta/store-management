import React, { useState, useEffect } from 'react'
import { Pagination as PageNext } from 'react-bootstrap'

const Pagination = ({ totalRocords = 20, dataPerPage = 10 }) => {
	const [active, setActive] = useState(1)
	const totalPage = Math.ceil(totalRocords / dataPerPage)

	useEffect(() => {
		console.log('mount')
	})

	const handleClick = (activePage) => {
		console.log({ activePage })
		setActive(activePage)
	}

	const getItems = () => {
		let items = []
		for (let page = 1; page <= totalPage; page++) {
			items.push(
				<Pagination.Item key={page} active={page === active}>
					{page}
				</Pagination.Item>
			)
		}
		return items.toLocaleString()
	}

	return <PageNext onClick={handleClick}>{getItems()}</PageNext>
}

export default Pagination
