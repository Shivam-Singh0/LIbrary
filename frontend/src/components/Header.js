import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../actions/userActions'
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox'

function Header() {
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const dispatch = useDispatch()
    const { userInfo } = userLogin
    const logOutHandler = () => {
        dispatch(LogOut())
        navigate('/')

    }
    return (
        <Navbar bg="info" variant='dark' expand="lg">
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>Shivam Library</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <SearchBox />
                    <Nav className="ms-auto">
                        {userInfo ? (<NavDropdown title={<span><i className="fa-solid fa-user"></i> {userInfo.name}</span>} >
                            <NavDropdown.Item onClick={logOutHandler}>
                                <i class="fa-solid fa-right-from-bracket"></i> Log Out
                            </NavDropdown.Item>
                        </NavDropdown>) : (
                            <LinkContainer className='btn btn-info' to='/register'>
                                <Nav.Link>Sign Up</Nav.Link>
                            </LinkContainer>
                        )}

                        {userInfo && userInfo.isAdmin &&
                            (<LinkContainer to='/admin/userslist'>
                                <Nav.Link className='btn btn-primary'>Users List</Nav.Link>
                            </LinkContainer>)
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header