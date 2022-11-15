import {
    BOOKS_LIST_REQUEST,
    BOOKS_LIST_SUCCESS,
    BOOKS_LIST_FAIL,


    BOOKS_CREATE_REQUEST,
    BOOKS_CREATE_SUCCESS,
    BOOKS_CREATE_FAIL,

    BOOKS_EDIT_REQUEST,
    BOOKS_EDIT_SUCCESS,
    BOOKS_EDIT_FAIL,

    BOOK_DETAIL_REQUEST,
    BOOK_DETAIL_SUCCESS,
    BOOK_DETAIL_FAIL,

    BOOK_DELETE_REQUEST,
    BOOK_DELETE_SUCCESS,

    BOOKS_MATCH_REQUEST,
    BOOKS_MATCH_SUCCESS,


} from '../constants/booksConstant'

import axios from 'axios'

export const getBooks = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: BOOKS_LIST_REQUEST })

        const { data } = await axios.get(`/api/books/books_list${ keyword }`)

        dispatch({
            type: BOOKS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BOOKS_LIST_FAIL,

            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const CreateBook = () => async (dispatch, getState) => {
    try {

        dispatch({ type: BOOKS_CREATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Authorization': `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.post('/api/books/bookCreate/', {}, config)

        dispatch({
            type: BOOKS_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BOOKS_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const BookDetail = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: BOOK_DETAIL_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                'Authorization': `Bearer ${ userInfo.token }`
            }
        }

        const { data } = await axios.get(`/api/books/bookDetail/${ id }/`, config)

        dispatch({
            type: BOOK_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BOOK_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const DelBook = (id) => async (dispatch, getState) => {
    dispatch({ type: BOOK_DELETE_REQUEST })

    const {
        userLogin: { userInfo }
    } = getState()

    const config = {
        headers: {
            'Authorization': `Bearer ${ userInfo.token }`
        }
    }

    await axios.delete(`api/books/bookDel/${ id }/`, config)

    dispatch({ type: BOOK_DELETE_SUCCESS })

}


export const EditBook = (id, update) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOKS_EDIT_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${ userInfo.token }`
            }
        }


        const { data } = await axios.put(`/api/books/bookEdit/${ id }/`, update, config)

        dispatch({
            type: BOOKS_EDIT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOKS_EDIT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const getBooksName = (pk) => async (dispatch) => {
    dispatch({ type: BOOKS_MATCH_REQUEST })

    const { data } = await axios.get(`/api/books/matchingBooks/${ pk }/`)

    dispatch({
        type: BOOKS_MATCH_SUCCESS,
        payload: data
    })



}

