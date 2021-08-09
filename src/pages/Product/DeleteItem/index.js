import React from 'react'
import Modal from '../../../components/Modal'
import { Col, Row } from 'react-bootstrap'

const deleteItem = (itemToDelete) => {
	const products = localStorage.getItem('products')
	const parsedItems = products ? JSON.parse(products) : { products: [] }
	let storedItems = parsedItems.products || []

	const deleteIndex = storedItems.findIndex(
		(product) => product.id === itemToDelete.id
	)
	console.log(deleteIndex)

	const updatedItems = {
		products: [...storedItems.splice(deleteIndex, 1)],
	}

	localStorage.setItem('products', JSON.stringify(updatedItems))

	return true
}

const DeleteItem = ({ show, itemToDelete, setDeleteItem }) => {
	const handleClose = () => {
		setDeleteItem(false)
	}

	const handleDelete = () => {
		deleteItem(itemToDelete)
		setDeleteItem(false)
	}

	const editProductForm = (
		<Row>
			<Col>{`Do you want to delete product ${itemToDelete.name}`}</Col>
		</Row>
	)

	return (
		<Modal
			show={show}
			headerTitle={'Delete Item'}
			btnText='Delete'
			btnVariant='danger'
			modalContent={editProductForm}
			onCancel={handleClose}
			onSubmit={handleDelete}
		/>
	)
}

export default DeleteItem
