import React from 'react'
import Modal from '../../../components/Modal'
import { Col, Row, Form } from 'react-bootstrap'
import { useFormik } from 'formik'

const editItem = (item) => {
	const products = localStorage.getItem('products')
	const parsedItems = products ? JSON.parse(products) : { products: [] }
	let storedItems = parsedItems.products || []

	const editIndex = storedItems.findIndex((product) => product.id === item.id)
	let editItem = {
		...storedItems[editIndex],
		name: item.name,
		category: item.category,
		price: item.price,
	}

	const updatedItems = {
		products: [
			...storedItems.slice(0, editIndex),
			editItem,
			...storedItems.slice(editIndex + 1),
		],
	}

	localStorage.setItem('products', JSON.stringify(updatedItems))
	return true
}

const validate = (values) => {
	const errors = {}

	if (!values.name) {
		errors.name = 'Required'
	}

	if (!values.category) {
		errors.category = 'Required'
	}

	if (!values.price) {
		errors.price = 'Required'
	}
	return errors
}

const EditItem = ({ show, itemToEdit, setEditItem }) => {
	const handleClose = () => {
		setEditItem(false)
	}

	const formik = useFormik({
		initialValues: {
			id: itemToEdit.id,
			name: itemToEdit.name,
			category: itemToEdit.category,
			price: itemToEdit.price,
		},

		validate,

		onSubmit: async (values) => {
			const result = await editItem(values)
			if (result) {
				// history.push('/products')
			}
		},
	})
	const editProductForm = (
		<Form>
			<Form.Group as={Row} className='mb-3' controlId='formPlaintextName'>
				<Form.Label column sm='2'>
					Name
				</Form.Label>
				<Col>
					<Form.Control
						id='name'
						name='name'
						type='text'
						placeholder='Product Name'
						onChange={formik.handleChange}
						value={formik.values.name}
					/>
				</Col>
			</Form.Group>

			<Form.Group as={Row} className='mb-3' controlId='formPlaintextCategory'>
				<Form.Label column sm='2'>
					Category
				</Form.Label>
				<Col>
					<Form.Control
						id='category'
						name='category'
						type='text'
						placeholder='Category'
						onChange={formik.handleChange}
						value={formik.values.category}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} className='mb-3' controlId='formPlaintextPrice'>
				<Form.Label column sm='2'>
					Price
				</Form.Label>
				<Col>
					<Form.Control
						id='price'
						name='price'
						type='text'
						placeholder='price'
						onChange={formik.handleChange}
						value={formik.values.price}
					/>
				</Col>
			</Form.Group>
		</Form>
	)

	return (
		<Modal
			show={show}
			headerTitle={'Edit Item'}
			btnText='Edit'
			modalContent={editProductForm}
			onCancel={handleClose}
			onSubmit={formik.handleSubmit}
		/>
	)
}

export default EditItem
