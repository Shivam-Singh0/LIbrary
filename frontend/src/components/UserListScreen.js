import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message';
import { DelUSer, getUsers } from '../actions/userActions'
import { USER_DEL_RESET } from '../constants/userConstants';

function UserListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userList = useSelector((state) => state.userList)
    const { users, loading, error } = userList
    const userDel = useSelector((state) => state.userDel)
    const { loading: loadingDel, deleted } = userDel

    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                dispatch(getUsers())
            } else {
                navigate('/')
            }
        } else {
            navigate('/')
        }

    }, [dispatch, navigate, userInfo, deleted])

    const deleteHandler = (id) => {
        dispatch(DelUSer(id))
        dispatch({ type: USER_DEL_RESET })
    }

    return (
        <div>
            {loading && <Loader />}
            {error && <Message variant={'danger'}>{error}</Message>}
            <Table responsive hover border={1} className='bg-white shadow mt-5' >

                <thead>
                    <tr className='bg-info'>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.isAdmin ?
                                <i class="fa-solid fa-check fw-bold fs-4" style={{ color: 'green' }}  ></i> :
                                <i class="fa-solid fa-xmark fw-bold fs-4" style={{ color: 'red' }}  ></i>
                            }</td>
                            <td>
                                <Link className='btn btn-light' to={`/admin/useredit/${ user.id }`}><i className="fa-solid fa-pen-to-square"></i></Link>
                                <Button variant='light' onClick={() => deleteHandler(user.id)}>{loadingDel ? <Loader /> : <i className='fas fa-trash' style={{ 'color': 'red' }}></i>}</Button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </Table>
        </div>
    )
}

export default UserListScreen