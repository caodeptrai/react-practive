import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../assets/react.svg'
import './Header.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
        toast.success("log out success!!")

    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="" />
                    <span> React-Bootstrap</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" >

                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/users"> Manager Users</NavLink>

                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting">

                            <Link className="dropdown-item" to="/login">Login</Link>
                            <NavDropdown.Divider />
                            <div className="dropdown-item" onClick={() => handleLogout()}> Log out</div>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header