import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const UserPage = () => {
	let { path } = useRouteMatch()
	return (
		<Switch>
			<Route exact path={path}>
				<Login />
			</Route>
			<Route path={`${path}/login`}>
				<Login />
			</Route>
			<Route path={`${path}/signup`}>
				<SignUp />
			</Route>
		</Switch>
	)
}

export default UserPage
