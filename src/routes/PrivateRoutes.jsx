import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Alert } from 'react-bootstrap';

const PrivateRoutes = (props) => {

    const { user } = useContext(UserContext)

    if (user && !user.auth) {
        return (
            <Alert variant="danger" >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    Change this and that and try again. Duis mollis, est non commodo
                    luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                    Cras mattis consectetur purus sit amet fermentum.
                </p>
            </Alert>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoutes