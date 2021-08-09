import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'

const createUniqueUser = async (user) => {
	const lastUserId = localStorage.getItem('lastUserId')
	const users = localStorage.getItem('users')
	const userId = lastUserId ? parseInt(lastUserId) + 1 : 1
	const localUsers = users ? JSON.parse(users) : { users: [] }
	const usersData = {
		users: [...localUsers.users, { ...user, id: userId }],
	}
	localStorage.setItem('lastUserId', JSON.stringify(userId))
	localStorage.setItem('users', JSON.stringify(usersData))
	return true
}

const validate = (values) => {
	const errors = {}
	if (!values.name) {
		errors.name = 'Required'
	}

	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.phoneNumber) {
		errors.phoneNumber = 'Required'
	} else if (!/^[6-9]\d{9}$/.test(values.phoneNumber)) {
		errors.phoneNumber = 'Enter valid format'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
		errors.password = '8 characters,1 letter & 1 number'
	}

	if (values.aggrement === false) {
		errors.aggrement = 'Accept terms and conditions.'
	}
	console.log(errors)
	return errors
}

const SignUp = () => {
	const history = useHistory()

	const formik = useFormik({
		initialValues: {
			name: '',
			lastName: '',
			phoneNumber: '',
			email: '',
			password: '',
			aggrement: false,
		},

		validate,

		onSubmit: async (values) => {
			const result = await createUniqueUser(values)
			if (result) {
				history.push('/products')
			}
		},
	})

	return (
		<div className='login-container'>
			<div className='form-register-box'>
				<Form id='register'>
					<Form.Group className='mb-3' controlId='formBasicName'>
						<Form.Label>Name *</Form.Label>
						{formik.errors.name && formik.touched.name && (
							<span className='p-2 text-danger'>{formik.errors.name}</span>
						)}
						<Form.Control
							id='name'
							name='name'
							type='text'
							placeholder='Enter Name'
							onChange={formik.handleChange}
							value={formik.values.name}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicLastName'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							id='lastName'
							name='lastName'
							type='text'
							placeholder='Enter Last Name'
							onChange={formik.handleChange}
							value={formik.values.lastName}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicLastName'>
						<Form.Label>Phone Number *</Form.Label>
						{formik.errors.phoneNumber && formik.touched.phoneNumber && (
							<span className='p-2 text-danger'>
								{formik.errors.phoneNumber}
							</span>
						)}
						<Form.Control
							id='phoneNumber'
							name='phoneNumber'
							type='tel'
							placeholder='9648125486'
							onChange={formik.handleChange}
							value={formik.values.phoneNumber}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email *</Form.Label>
						{formik.errors.email && formik.touched.email && (
							<span className='p-2 text-danger'>{formik.errors.email}</span>
						)}
						<Form.Control
							id='email'
							name='email'
							type='email'
							placeholder='example@mail.com'
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password *</Form.Label>
						{formik.errors.password && formik.touched.password && (
							<span className='p-2 text-danger'>{formik.errors.password}</span>
						)}
						<Form.Control
							id='password'
							name='password'
							type='password'
							placeholder='Password'
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
					</Form.Group>
					<Form.Group className='mb-2' controlId='formTermsCheckbox'>
						<Form.Check
							id='aggrement'
							name='aggrement'
							type='checkbox'
							label='I aggred with terms & conditions.'
							onChange={formik.handleChange}
							value={formik.values.aggrement}
							className={`${formik.errors.aggrement ? 'text-danger' : null}`}
						/>
					</Form.Group>
					<div className='text-end pt-2'>
						<span className='p-3'>
							<Link to='/user/login'>Log In</Link>
						</span>
						<Button
							variant='primary'
							type='submit'
							onClick={formik.handleSubmit}
						>
							Register
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default SignUp
