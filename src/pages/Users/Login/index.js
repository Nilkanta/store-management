import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'

const validate = (values) => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	return errors
}

const Login = () => {
	const history = useHistory()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},

		validate,

		onSubmit: async (values) => {
			const localUsers = localStorage.getItem('users')
			const { users } = JSON.parse(localUsers)
			const storageUser = users.find((user) => user.email === values.email)
			if (
				storageUser.email === values.email &&
				storageUser.password === values.password
			) {
				history.push('/products')
			}
			formik.errors.password = 'Enter valid credential.'
		},
	})

	return (
		<div className='login-container'>
			<div className='form-login-box'>
				<Form id='login'>
					<Form.Group className='mb-3' controlId='formBasicEmail'>
						<Form.Label>Email address</Form.Label>
						{formik.errors.email && formik.touched.email && (
							<span className='p-2 text-danger'>{formik.errors.email}</span>
						)}
						<Form.Control
							id='email'
							name='email'
							type='email'
							placeholder='Enter email'
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
					</Form.Group>

					<Form.Group className='mb-3' controlId='formBasicPassword'>
						<Form.Label>Password</Form.Label>
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
					<div className='text-end'>
						<span className='p-3'>
							<Link to='/user/signup'>Register</Link>
						</span>
						<Button
							variant='primary'
							type='submit'
							onClick={formik.handleSubmit}
						>
							Log In
						</Button>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default Login
