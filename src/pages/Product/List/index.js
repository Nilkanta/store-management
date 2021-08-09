import React, { useEffect, useState } from 'react'
import Icon from '../../../components/Icon'
import AddItem from '../AddItem'
import EditItem from '../EditItem'
import DeleteItem from '../DeleteItem'
import { isEmpty } from 'lodash'
import {
	Button,
	Col,
	Container,
	Row,
	Table,
	InputGroup,
	FormControl,
} from 'react-bootstrap'
import {
	faSortAlphaUp,
	faSortAlphaDownAlt,
	faSortAmountUp,
	faSortAmountDownAlt,
	faFileExport,
	faSpinner,
	faPlusSquare,
	faEdit,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'

const List = () => {
	const updateList = () => {
		const storedProducts = localStorage.getItem('products')
		const { products } = storedProducts
			? JSON.parse(storedProducts)
			: { products: [] }

		return products || []
	}

	const [input, setInput] = useState('')
	const [filterData, setFilterData] = useState(updateList())
	const [sortNameByAsc, setSortNameByAsc] = useState(false)
	const [sortPriceByAsc, setSortPriceByAsc] = useState(false)
	const [exportFile, setExportFile] = useState(false)
	const [addItem, setAddItem] = useState(false)
	const [editItem, setEditItem] = useState(false)
	const [deleteItem, setDeleteItem] = useState(false)
	const [itemToEdit, setItemToEdit] = useState(null)
	const [itemToDelete, setItemToDelete] = useState(null)

	//Sort by name

	useEffect(() => {
		let sortItems = (filterData || []).sort((a, b) =>
			sortNameByAsc
				? b.name.localeCompare(a.name)
				: a.name.localeCompare(b.name)
		)

		setFilterData(sortItems)
	}, [sortNameByAsc, filterData])

	//Sort by price
	useEffect(() => {
		let sortItems = (filterData || []).sort((a, b) =>
			sortPriceByAsc ? b.price - a.price : a.price - b.price
		)

		setFilterData(sortItems)
	}, [sortPriceByAsc, filterData])

	const handleChange = (input) => {
		setInput(input)
		if (!input) {
			setFilterData(updateList())
		}
	}

	const handleSubmit = () => {
		const filteritems = (filterData || []).filter((item) =>
			item.name.toLowerCase().includes(input)
		)
		setFilterData(filteritems)
	}

	return (
		<Container className='list-container'>
			<Table className='table pt-4'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Product Name</th>
						<th>Category</th>
						<th>
							<Row className='no-wrap'>
								<Col className='pt-2'>Price</Col>
								<Col>
									<InputGroup size='sm' className=''>
										<FormControl
											placeholder='Search...'
											aria-label='Small'
											aria-describedby='inputGroup-sizing-sm'
											onChange={(e) => handleChange(e.target.value)}
										/>
										<Button
											variant='outline-secondary'
											size='sm'
											id='search-button'
											onClick={handleSubmit}
										>
											Search
										</Button>
									</InputGroup>
								</Col>
								<Col className='pt-2'>
									<Row>
										<Col className='text-end'>
											<Icon
												icon={
													sortNameByAsc ? faSortAlphaUp : faSortAlphaDownAlt
												}
												className='clickable'
												onClick={() => setSortNameByAsc(!sortNameByAsc)}
											/>
										</Col>
										<Col className='col-auto'>
											<Icon
												icon={
													sortPriceByAsc ? faSortAmountDownAlt : faSortAmountUp
												}
												className='clickable'
												onClick={() => setSortPriceByAsc(!sortPriceByAsc)}
											/>
										</Col>
										<Col className='col-auto'>
											<Icon
												icon={addItem ? faSpinner : faPlusSquare}
												className='clickable'
												onClick={() => setAddItem(!addItem)}
											/>
										</Col>
										<Col>
											<Icon
												icon={exportFile ? faSpinner : faFileExport}
												className='clickable'
												onClick={() => setExportFile(!exportFile)}
											/>
										</Col>
									</Row>
								</Col>
							</Row>
						</th>
					</tr>
				</thead>
				<tbody>
					{filterData.map((item) => {
						const { id, name, category, price } = item || {}
						return (
							<tr key={id}>
								<td>{id}</td>
								<td>{name}</td>
								<td>{category}</td>
								<td>
									<Row>
										<Col>{price}</Col>
										<Col className='text-end px-4'>
											<Icon
												icon={faEdit}
												className='clickable'
												onClick={() => {
													setEditItem(!editItem)
													setItemToEdit(item)
												}}
											/>
										</Col>
										<Col className='col-3 px-0'>
											<Icon
												icon={faTrash}
												className='clickable'
												onClick={() => {
													setDeleteItem(!deleteItem)
													setItemToDelete(item)
												}}
											/>
										</Col>
									</Row>
								</td>
							</tr>
						)
					})}

					{isEmpty(filterData) && (
						<tr>
							<td className='text-center'>No Item Found!</td>
						</tr>
					)}
				</tbody>
			</Table>
			{addItem && <AddItem show={addItem} setAddItem={setAddItem} />}
			{editItem && (
				<EditItem
					show={editItem}
					itemToEdit={itemToEdit}
					setEditItem={setEditItem}
				/>
			)}
			{deleteItem && (
				<DeleteItem
					show={deleteItem}
					itemToDelete={itemToDelete}
					setDeleteItem={setDeleteItem}
				/>
			)}
		</Container>
	)
}

export default List
