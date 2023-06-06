import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { deleteUser, postCreateUser } from "../../services/UserServices"

import { toast } from 'react-toastify';

const ModalDeleteUser = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            handleClose()
            toast.success("Delete user success")
            handleDeleteUserFromModal(dataUserDelete)
        } else {
            toast.error("error delete user")
        }
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure delete this user?</h5>
                    <br />
                    <strong>{`Email:"${dataUserDelete.email}"`}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser