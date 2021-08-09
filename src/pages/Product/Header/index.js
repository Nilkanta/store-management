import React, { useState } from 'react'
import { Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap'

const Header = () => {
	const [sortNameByAsc, setSortNameByAsc] = useState(true)
	const [sortPriceByAsc, setSortPriceByAsc] = useState(true)
	return <Row className='list-header'></Row>
}

export default Header
