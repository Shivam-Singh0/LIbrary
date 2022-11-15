import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_RESET_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,

    USER_DEL_REQUEST,
    USER_DEL_SUCCESS,
    USER_DEL_RESET,


} from '../constants/userConstants'




export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_REGISTER_REQUEST:
            return { ...state, loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_RESET_FAIL:
            return {}

        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case USER_LIST_REQUEST:
            return { ...state, loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }


        default:
            return state
    }
}

export const userDelReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_DEL_REQUEST:
            return { ...state, loading: true }

        case USER_DEL_SUCCESS:
            return { loading: false, deleted: true }
        case USER_DEL_RESET:
            return {}

        default:
            return state
    }
}