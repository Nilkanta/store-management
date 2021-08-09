import React, { useState } from 'react'
import Modal from '../../../components/Modal'
import { Col, Row, Form } from 'react-bootstrap'
import { useFormik } from 'formik'

const addUniqueItem = (item) => {
	const lastProductId = localStorage.getItem('lastProductId')
	const products = localStorage.getItem('products')
	const itemId = lastProductId ? parseInt(lastProductId) + 1 : 1
	const storedItems = products ? JSON.parse(products) : { products: [] }
	const itemsData = {
		products: [...storedItems.products, { ...item, id: itemId }],
	}
	localStorage.setItem('lastProductId', JSON.stringify(itemId))
	localStorage.setItem('products', JSON.stringify(itemsData))
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

const AddItem = ({ show, setAddItem }) => {
	const [success, setSuccess] = useState()

	const handleClose = () => {
		setAddItem(false)
	}

	const formik = useFormik({
		initialValues: {
			name: '',
			category: '',
			price: 0,
		},

		validate,

		onSubmit: async (values) => {
			const result = await addUniqueItem(values)
			if (result) {
				setSuccess('Item added!')
				// history.push('/products')
			}
		},
	})
	const addProductForm = (
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
			{success && <span className='text-center text-success'>{success}</span>}
		</Form>
	)

	return (
		<Modal
			show={show}
			headerTitle={'Add Item'}
			btnText='Add'
			modalContent={addProductForm}
			onCancel={handleClose}
			onSubmit={formik.handleSubmit}
		/>
	)
}

export default AddItem
