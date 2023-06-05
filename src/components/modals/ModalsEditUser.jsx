import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { postCreateUser } from "../../services/UserServices"

import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleCloseEditModal, dataUserEdit } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")


    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)

        }
    }, [dataUserEdit])

    const handleEditUser = () => {

    }
    console.log(dataUserEdit)

    return (
        <>
            <Modal show={show} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Jobs</Form.Label>
                            <Form.Control type="text" placeholder="enter your job" value={job} onChange={(e) => setJob(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser