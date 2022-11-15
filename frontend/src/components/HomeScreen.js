import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateBook, DelBook, getBooks } from '../actions/booksAction';
import { Table, Image, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { BOOKS_CREATE_RESET, BOOK_DELETE_RESET } from '../constants/booksConstant';
import Message from './Message'
import { useLocation } from 'react-router-dom';
import Paginate from './Paginate';
import Loader from './Loader';
function HomeScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const booksList = useSelector((state) => state.booksList)
    const { loading, books, error, page, pages } = booksList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const bookCreate = useSelector((state) => state.bookCreate)
    const { loading: createLoading, error: createError, success: createSuccess, book } = bookCreate


    const bookDel = useSelector((state) => state.bookDel)
    const { deleted } = bookDel

    const location = useLocation()
    let keyword = location.search

    let searchKey = keyword.split('=')[1]


    useEffect(() => {
        if (userInfo) {
            dispatch(getBooks(keyword))
            if (createSuccess) {
                navigate(`/admin/edit/${ book.id }`)
                dispatch({ type: BOOKS_CREATE_RESET })

            }
        } else {
            navigate('/login')
        }



    }, [dispatch, createSuccess, navigate, book, deleted, keyword, userInfo])

    const deleteHandler = (id) => {
        dispatch(DelBook(id))
        dispatch({ type: BOOK_DELETE_RESET })
    }

    const addHandler = () => {
        dispatch(CreateBook())
    }

    return (
        <div>
            {createLoading && <Loader />}
            {loading ? (<Loader />) :
                error ? (<Message variant={'danger'} dismissible>{error}</Message>)
                    : (
                        <div>
                            {searchKey === '&page' || searchKey === undefined ? (

                                <h1>Books List</h1>

                            ) : <h1>Search Results....</h1>}
                            <div>
                                <Table responsive hover border={1} className='bg-white shadow' >

                                    <thead>
                                        <tr className='bg-info'>
                                            <th>ID</th>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Author</th>

                                            <th>Available</th>
                                            {userInfo && userInfo.isAdmin && <th>
                                                <Button className='btn-sm' onClick={() => addHandler()} disabled={createLoading} ><i class="fa-regular fa-layer-plus"></i> Add Book</Button>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {books.map((book) => (
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td><Image id='book_img' src={book.image} fluid /></td>
                                                <td>{book.name}</td>
                                                <td>{book.author}</td>
                                                <td>{book.available && <p>available</p>}</td>
                                                {userInfo && userInfo.isAdmin && <td>
                                                    <Link className='btn btn-light' to={`/admin/edit/${ book.id }`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                                    <Button variant='light' onClick={() => deleteHandler(book.id)}><i className='fas fa-trash' style={{ 'color': 'red' }}></i></Button>
                                                </td>}
                                            </tr>
                                        ))}


                                    </tbody>
                                </Table>
                            </div>

                            {books.length > 0 && <Paginate page={page} pages={pages} keyword={keyword} />}
                        </div>

                    )}
            {createError && <Message variant={'danger'} dismissible>{createError}</Message>}
        </div>

    )
}

export default HomeScreen