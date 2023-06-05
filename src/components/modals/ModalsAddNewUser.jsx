import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"


const ModalsAddNewUser = (props) => {
    const { show, handleClose } = props
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleSave = () => {
        console.log("name:", name, "job:", job)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new user</Modal.Title>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalsAddNewUser