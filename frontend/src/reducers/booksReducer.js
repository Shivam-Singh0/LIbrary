import {
    BOOKS_LIST_REQUEST,
    BOOKS_LIST_SUCCESS,
    BOOKS_LIST_FAIL,

    BOOKS_CREATE_REQUEST,
    BOOKS_CREATE_SUCCESS,
    BOOKS_CREATE_FAIL,
    BOOKS_CREATE_RESET,

    BOOKS_EDIT_REQUEST,
    BOOKS_EDIT_SUCCESS,
    BOOKS_EDIT_FAIL,
    BOOKS_EDIT_RESET,

    BOOK_DETAIL_REQUEST,
    BOOK_DETAIL_SUCCESS,
    BOOK_DETAIL_FAIL,

    BOOK_DELETE_REQUEST,
    BOOK_DELETE_SUCCESS,
    BOOK_DELETE_RESET,

    BOOKS_MATCH_REQUEST,
    BOOKS_MATCH_SUCCESS,



} from '../constants/booksConstant'



export const booksListReducer = (state = { books: [] }, action) => {
    switch (action.type) {

        case BOOKS_LIST_REQUEST:
            return { ...state, loading: true }

        case BOOKS_LIST_SUCCESS:
            return { loading: false, books: action.payload.books, page: action.payload.page, pages: action.payload.pages }

        case BOOKS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const booksDetailReducer = (state = { book: {} }, action) => {
    switch (action.type) {

        case BOOK_DETAIL_REQUEST:
            return { loading: true, ...state }

        case BOOK_DETAIL_SUCCESS:
            return { loading: false, book: action.payload }

        case BOOK_DETAIL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const bookCreateReducer = (state = { book: [] }, action) => {
    switch (action.type) {
        case BOOKS_CREATE_REQUEST:
            return { ...state, loding: true }

        case BOOKS_CREATE_SUCCESS:
            return { loding: false, book: action.payload, success: true }


        case BOOKS_CREATE_FAIL:
            return { loding: false, error: action.payload }


        case BOOKS_CREATE_RESET:
            return { book: [] }



        default:
            return state;
    }
}

export const bookEditReducer = (state = {}, action) => {

    switch (action.type) {

        case BOOKS_EDIT_REQUEST:
            return { loading: true }

        case BOOKS_EDIT_SUCCESS:
            return { loading: false, edited: true }

        case BOOKS_EDIT_FAIL:
            return { loading: false, error: action.payload }

        case BOOKS_EDIT_RESET:
            return {}

        default:
            return state
    }

}

export const bookDelReducer = (state = {}, action) => {

    switch (action.type) {

        case BOOK_DELETE_REQUEST:
            return { ...state, loading: true }

        case BOOK_DELETE_SUCCESS:
            return { loading: false, deleted: true }

        case BOOK_DELETE_RESET:
            return {}


        default:
            return state
    }

}

export const bookNamesReducer = (state = { names: [] }, action) => {

    switch (action.type) {

        case BOOKS_MATCH_REQUEST:
            return { ...state, loading: true }

        case BOOKS_MATCH_SUCCESS:
            return { loading: false, names: action.payload }


        default:
            return state
    }

} 