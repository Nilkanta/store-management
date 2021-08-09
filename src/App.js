import React from 'react'
import Users from './pages/Users'
import Product from './pages/Product'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path={`/`}>
					<Users />
				</Route>
				<Route path={`/user`}>
					<Users />
				</Route>
				<Route path={`/products`}>
					<Product />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
