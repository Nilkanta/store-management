import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Icon = ({ icon = ['fas', 'diamond'], onClick, className }) => {
	return (
		<FontAwesomeIcon
			className={className}
			fixedWidth={true}
			icon={icon}
			onClick={onClick}
		/>
	)
}

export default Icon
