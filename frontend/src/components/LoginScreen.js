import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import { LoginUser } from '../actions/userActions'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import Loader from './Loader';


function LoginScreen() {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, success } = userLogin

    useEffect(() => {
        if (success) {
            navigate('/')
        }


    }, [success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(LoginUser(email, password))


    }



    return (
        <div>
            {loading && <Loader />}
            <div className='d-flex justify-content-center'>

                <Card className='login-card border-white shadow my-5'>
                    <Row>
                        <Col md={6}> <Card.Img id='login-image' src={require('../images/custom-library.jpg')} /> </Col>

                        <Col md={5} className='offset-md-1 my-auto' >
                            <Card.Title className=' my-3 mx-3'>Sign In</Card.Title>

                            <Card.Body>
                                {error && <Message variant='danger' dismissible >{error}</Message>}

                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                    </Form.Group>



                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                                <div className='my-2'>
                                    Don't Have an Account ? Click  <Link to='/register' >here</Link>
                                </div>
                            </Card.Body>
                        </Col>

                    </Row>
                </Card>

            </div >
        </div>
    )
}

export default LoginScreen