import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../assets/react.svg'
import './Header.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../../redux/actions/userAction';
import { useEffect } from 'react';




const Header = () => {

    const user = useSelector(state => state.user.account)

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(handleLogoutRedux())

    }

    useEffect(() => {

        if (user && user.auth === false && window.location.pathname !== '/login') {
            navigate("/")
            toast.success("log out success!!")
        }
    }, [user])

    console.log("check user", user)
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="" />
                    <span> React-Bootstrap</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto" >

                                <NavLink className="nav-link" to="/">Home</NavLink>
                                <NavLink className="nav-link" to="/users"> Manager Users</NavLink>

                            </Nav>
                            <Nav>
                                {user && user.email && <span className='nav-link'>Wellcome, {user.email}</span>}

                                <NavDropdown title="Setting">

                                    <Link className="dropdown-item" to="/login">Login</Link>
                                    <NavDropdown.Divider />
                                    <div className="dropdown-item" onClick={() => handleLogout()}> Log out</div>

                                </NavDropdown>
                            </Nav>
                        </>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header