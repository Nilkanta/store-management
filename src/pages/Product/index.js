import React from 'react'
import List from './List'
import Add from './AddItem'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const ProductPage = () => {
	let { path } = useRouteMatch()
	return (
		<Switch>
			<Route exact path={path}>
				<List />
			</Route>
			<Route path={`${path}/list`}>
				<List />
			</Route>
			<Route path={`${path}/add`}>
				<Add />
			</Route>
		</Switch>
	)
}

export default ProductPage
