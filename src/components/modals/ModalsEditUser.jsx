import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { postCreateUser, putUpdateUser } from "../../services/UserServices"

import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleCloseEditModal, dataUserEdit, handleEditUserFromModal } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleEditUser = async () => {

        let res = await putUpdateUser(name, job)
        console.log("click")
        if (res && res.updatedAt) {
            handleEditUserFromModal({ first_name: name, id: dataUserEdit.id })
        }

        handleCloseEditModal()
        toast.success("Edit success!!")
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)

        }
    }, [dataUserEdit])




    return (
        <>
            <Modal show={show}
                onHide={handleCloseEditModal}
                keyboard={false}
                backdrop="static"
            >
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