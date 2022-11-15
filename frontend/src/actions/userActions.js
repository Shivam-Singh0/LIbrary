import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,

    USER_DEL_REQUEST,
    USER_DEL_SUCCESS,

} from '../constants/userConstants'



export const LoginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const { data } = await axios.post('/api/users/login/', { 'email': email, 'password': password })


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,

            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}


export const LogOut = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const RegisterUser = (email, password, first_name, last_name) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })

        const { data } = await axios.post('/api/users/register/', { 'email': email, 'password': password, 'first_name': first_name, 'last_name': last_name })


        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,

            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}



export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST })

        const { data } = await axios.get('/api/users/list/')


        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,

            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })

    }
}



export const DelUSer = (id) => async (dispatch, getState) => {
    dispatch({ type: USER_DEL_REQUEST })

    const {
        userLogin: { userInfo }
    } = getState()

    const config = {
        headers: {
            'Authorization': `Bearer ${ userInfo.token }`
        }
    }

    await axios.delete(`/api/users/del/${ id }/`, config)

    dispatch({ type: USER_DEL_SUCCESS })

}

