import React, { useEffect, useState, } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BookDetail, EditBook } from '../actions/booksAction'
import { BOOKS_EDIT_RESET } from '../constants/booksConstant'
import Loader from './Loader';
import Message from './Message';

function EditScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [available, setAvailable] = useState(false)

    const bookDetail = useSelector((state) => state.booksDetail)
    const { loading, error, book } = bookDetail


    const bookEdit = useSelector((state) => state.bookEdit)
    const { loading: editLoading, error: editError, edited } = bookEdit

    const { id } = useParams()

    useEffect(() => {

        if (edited) {
            navigate('/')
            dispatch(BookDetail(id))
            dispatch({ type: BOOKS_EDIT_RESET })
        } else {
            if (!book.name || book.id !== Number(id)) {
                dispatch(BookDetail(id))

            } else {
                setName(book.name)
                setAuthor(book.author)
                setAvailable(book.available)

            }
        }






    }, [dispatch, id, book, edited, navigate])

    const submitHandler = (e) => {
        e.preventDefault()



        dispatch(EditBook(id, {
            'name': name, 'author': author, available, 'image': image,
        }))

    }

    return (

        <div className='mx-auto' id='edit-div'>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            {editError && <Message>{editError}</Message>}
            <Card id='edit-card' className='border-white shadow' >
                <Card.Body className='mt-5'>
                    <Form onSubmit={submitHandler}>

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text'
                                placeholder='enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Label>author</Form.Label>
                            <Form.Control type='text'
                                placeholder='enter Author name'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-3'>

                            <Form.Check
                                label='available'
                                checked={available}
                                onChange={(e) => setAvailable(e.target.checked)}>

                            </Form.Check>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <input
                                type="file"
                                className='form-control'
                                placeholder="Choose Image"
                                name="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Form.Group>


                        <Button type='submit' variant='primary'>
                            {
                                editLoading ? <Loader /> : <span>Submit</span>
                            }
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EditScreen