import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message';
import { RegisterUser } from '../actions/userActions'
import { USER_RESET_FAIL } from '../constants/userConstants'
import PasswordChecklist from "react-password-checklist"
import { getUsers } from '../actions/userActions'


function RegisterScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Confirmpassword, setConfirmPassword] = useState('')
    const [valid, setValid] = useState(false)
    const [emailExist, setEmailExist] = useState(false)

    const userRegister = useSelector((state) => state.userRegister)
    const { error, loading, success } = userRegister

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector((state) => state.userList)
    const { users } = userList



    useEffect(() => {
        dispatch(getUsers())

        if (userInfo) {
            navigate('/')
        }

        if (success) {
            navigate('/login')
            dispatch({ type: USER_RESET_FAIL })
        }


    }, [success, navigate, userInfo, dispatch])

    const emailHandler = (input) => {

        const filtered = users.filter(user => {
            return user.email === input
        })

        if (input.length > 0) {
            if (filtered.length > 0) {
                setEmailExist(true)
            } else {
                setEmailExist(false)
                setEmail(input)
            }
        }
    }

    const submitHandler = (e) => {

        e.preventDefault()
        dispatch(RegisterUser(email, password, first_name, last_name))




    }



    return (
        <div>
            {error && <Message variant={'danger'} dismissible>{error}</Message>}
            <div className='d-flex justify-content-center'>
                <Card id='register-card' className='border-light shadow'>
                    <Card.Title className='mx-auto mt-2'>Sign Up</Card.Title>
                    <Card.Body>
                        <Form onSubmit={submitHandler} autoComplete="new-password">
                            <Form.Group className="mb-3" controlId="formBasicEmail" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => emailHandler(e.target.value)} required autoComplete="new-password" />
                                {emailExist && <span className='text-muted'><i class="fa-solid fa-xmark fw-bold fs-4" style={{ color: 'red' }}  ></i> Email already exists</span>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" />
                            </Form.Group>

                            <PasswordChecklist
                                rules={["minLength", "match"]}
                                minLength={5}
                                value={password}
                                valueAgain={Confirmpassword}
                                onChange={(isValid) => setValid(isValid)}
                            />



                            <Button variant="primary" type="submit" disabled={loading || valid === false}>
                                {loading ? <Loader /> :
                                    <span>submit</span>
                                }
                            </Button>
                        </Form>
                        <div className='my-2'>
                            Already Have an Account ? Click  <Link to='/login' >here</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default RegisterScreen