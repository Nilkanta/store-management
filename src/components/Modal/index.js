import React from 'react'
import { Button, Modal as BsModal } from 'react-bootstrap'

const Modal = ({
	show = false,
	size = 'md',
	fullscreen = false,
	headerTitle,
	btnText = 'Submit',
	btnVariant = 'success',
	modalContent,
	onCancel,
	onSubmit,
	scrollable = true,
}) => {
	return (
		<BsModal
			show={show}
			size={size}
			fullscreen={fullscreen}
			onHide={onCancel}
			scrollable={scrollable}
		>
			<BsModal.Header closeButton>
				<BsModal.Title id='example-custom-modal-styling-title'>
					{headerTitle}
				</BsModal.Title>
			</BsModal.Header>
			<BsModal.Body>{modalContent}</BsModal.Body>
			<BsModal.Footer>
				<Button variant='secondary' onClick={onCancel}>
					Cancel
				</Button>
				<Button variant={btnVariant} onClick={onSubmit}>
					{btnText}
				</Button>
			</BsModal.Footer>
		</BsModal>
	)
}

export default Modal
